import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { PostgreSQLHelper } from '@src/config/db';
import { RedisHelper } from '@src/config/redis';
import { v4 as uuidv4 } from 'uuid'; // For generating unique session identifiers

import asyncHandler from 'express-async-handler';

import logger from '@src/config/logger';
const NAMESPACE = 'AuthController';


const loginController  = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const sessionId = req.cookies['session_id']; // Assuming you have a middleware to parse cookies
    const { email, password } = req.body;
    try {
        const result = await PostgreSQLHelper.query(
            'SELECT id, email, password,role FROM users WHERE email = $1',
            [email]
        );
        if (result.length > 0) {
            const user = result[0];
            const isValid = await bcrypt.compare(password, user.password);
            if (isValid) {
                const sessionId = uuidv4(); // Generate a unique session identifier
                await RedisHelper.set(`sess:${sessionId}`, JSON.stringify({ userId: user.id, role: user.role }), 3600); // Store the user ID and role in the session
                res.cookie('session_id', sessionId, { httpOnly: true }); // Send session ID as an HTTP-only cookie
                res.status(200).json({ 
                    message: 'Login successful', 
                    user: { 
                        id: user.id, 
                        username: user.username,
                        role: user.role, // Include the role in the response
                    } 
                });
            } else {
                res.status(401).json({ message: 'Invalid credentials' });
            }
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error : any) {
        logger.error(NAMESPACE, `Login failed. Error: ${error.message}`);
        next(error); // Pass errors to Express error handler
    }
});
const registerController = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {    
    const { first_name, last_name, email, password } = req.body; // Assuming the body contains email instead of username
    try {
        // Check if a user already exists with the provided email
        const existingUsers = await PostgreSQLHelper.query('SELECT * FROM users WHERE email = $1', [email]);
        if (existingUsers.length > 0) {
            res.status(409).json({ message: 'A user already exists with the provided email.' });
            return;
        }
        // If user does not exist, proceed with creating a new user
        let username = email.split('@')[0];
        username = username.replace(/[^a-zA-Z0-9]/g, '_'); // Replace non-alphanumeric characters with underscore

        // Check if the generated username already exists and append a number if it does
        let userCount = 0;
        let finalUsername = username;
        while (true) {
            const usersWithSimilarName = await PostgreSQLHelper.query('SELECT id FROM users WHERE username = $1', [finalUsername]);
            if (usersWithSimilarName.length === 0) {
                break; // If the username is unique, break out of the loop
            }
            finalUsername = `${username}${++userCount}`; // Append a number to make the username unique
        }

        const salt = await bcrypt.genSaltSync();
        const hashedPassword = await bcrypt.hashSync(password, salt);
        await PostgreSQLHelper.query('BEGIN');
        const newUser = await PostgreSQLHelper.query(
            'INSERT INTO users(email, username, first_name, last_name, password, role) VALUES($1, $2, $3, $4, $5, $6) RETURNING id, email, username',
            [email, finalUsername, first_name, last_name, hashedPassword, 'Patient'] // Assuming the default role is 'Patient'
        );
        const newPatient = await PostgreSQLHelper.query(
            'INSERT INTO patients(user_id) VALUES($1) RETURNING id',
            [newUser[0].id]
        );
        await PostgreSQLHelper.query('COMMIT');
        res.status(201).json(newUser[0]);
    }catch(error : any){
        await PostgreSQLHelper.query('ROLLBACK');
        logger.error(NAMESPACE, `Registration failed. Error: ${error.message}`);
        next(error); // Pass errors to Express error handler
    }
});
const logoutController  = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const sessionId = req.cookies['session_id']; // Assuming you have a middleware to parse cookies
    if (sessionId) {
        await RedisHelper.del(`sess:${sessionId}`);
        res.clearCookie('session_id'); // Remove the cookie from the client
        res.status(200).json({ message: 'Logout successful' });
    } else {
        res.status(400).json({ message: 'Not logged in' });
    }
});
const whoamiController  = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.cookies)
    const sessionId = req.cookies['session_id']; // Assuming you have a middleware to parse cookies
    console.log(`sess:${sessionId}`);
    if (sessionId) {
        const sessionData = await RedisHelper.get(`sess:${sessionId}`);
        if (sessionData) {
            // Parse the session data to get the userId
            const parsedSessionData = JSON.parse(sessionData);
            if (parsedSessionData.userId) {
                // Fetch user details including role
                const userResult = await PostgreSQLHelper.query(
                    'SELECT id, email, role FROM users WHERE id = $1',
                    [parsedSessionData.userId]
                );
                if (userResult.length > 0) {
                    const user = userResult[0];

                    // Initialize an object to hold the user's data
                    const userData = {
                        id: user.id,
                        email: user.email,
                        role: user.role,
                        patientDetails: null,
                        doctorDetails: null
                    };

                    // Based on the user's role, fetch additional details
                    if (user.role === 'Patient') {
                        const patientResult = await PostgreSQLHelper.query(
                            'SELECT * FROM patients WHERE user_id = $1',
                            [user.id]
                        );
                        // Assume that there will be one or none patient record for a user
                        if (patientResult.length > 0) {
                            userData.patientDetails = patientResult[0];
                        }
                    } else if (user.role === 'Doctor') {
                        const doctorResult = await PostgreSQLHelper.query(
                            'SELECT * FROM doctors WHERE user_id = $1',
                            [user.id]
                        );
                        // Assume that there will be one or none doctor record for a user
                        if (doctorResult.length > 0) {
                            userData.doctorDetails = doctorResult[0];
                        }
                    }
                    res.status(200).json({ message: 'Success', user: userData });
                } else {
                    res.status(404).json({ message: 'User not found' });
                }
            } else {
                res.status(401).json({ message: 'Invalid session data' });
            }
        } else {
            res.status(401).json({ message: 'Invalid session' });
        }
    } else {
        res.status(400).json({ message: 'Not logged in' });
    }
});
export{
    registerController,
    loginController,
    logoutController,
    whoamiController
};