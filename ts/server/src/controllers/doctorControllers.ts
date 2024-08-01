import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { PostgreSQLHelper } from '@src/config/db';
import { RedisHelper } from '@src/config/redis';
import { v4 as uuidv4 } from 'uuid'; // For generating unique session identifiers

import createError from 'http-errors';
import { getDoctorIdFromDb,getMyServices,getMyPatients } from '@src/db/doctorQuaries';
import asyncHandler from 'express-async-handler';

import logger from '@src/config/logger';
const NAMESPACE = 'AuthController';

const registerDoctorController = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {    
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
            'INSERT INTO users(email, username, first_name, last_name, password, role) VALUES($1, $2, $3, $4, $5, $6) RETURNING id, username',
            [email, finalUsername, first_name, last_name, hashedPassword, 'Doctor'] // Assuming the default role is 'Patient'
        );
        const newDoctor = await PostgreSQLHelper.query(
            'INSERT INTO doctors(user_id, doctorname) VALUES($1 $2) RETURNING id',
            [newUser[0].id,finalUsername]
        );
        await PostgreSQLHelper.query('COMMIT');
        res.status(201).json(newUser[0]);
    }catch(error : any){
        await PostgreSQLHelper.query('ROLLBACK');
        logger.error(NAMESPACE, `Registration failed. Error: ${error.message}`);
        next(error); // Pass errors to Express error handler
    }
});


const getDoctorProfileController = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {    
    const doctorID = req.params.id;
    // Check doctor is exist
    const user = await PostgreSQLHelper.query('SELECT * FROM users WHERE username = $1', [doctorID]);
    if (user.length === 0) {
        res.status(404).json({ message: 'Doctor not found.' });
        return;
    }
    if(user[0].role !== 'Doctor'){
        res.status(404).json({ message: 'Doctor not found.' });
        return;
    }
    const doctor = await PostgreSQLHelper.query('SELECT * FROM doctors WHERE user_id = $1', [user[0].id]);
    if (doctor.length === 0) {
        res.status(404).json({ message: 'Doctor not found.' });
        return;
    }    
    const contact = await PostgreSQLHelper.query('SELECT * FROM user_info WHERE user_id = $1', [user[0].id]);
    if(contact.length === 0){
        res.status(404).json({ message: 'Doctor not found.' });
        return;
    }    
    res.status(200).json({
        username: user[0].username,    
        fullname: user[0].fullname,
        specialty: doctor[0].specialty,
        contact: contact[0]
    });
});
const getMyServicesController = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {   
    if(!req.userId){
        throw createError.InternalServerError('');
    }
    const doctor = await getDoctorIdFromDb(req.userId);
        
    const myServices = await getMyServices(doctor.id);
    res.status(200).json({
        message: "My Services", 
        myServices: myServices
    });
});
const getMyPatientsController = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    if(!req.userId){
        throw createError.InternalServerError('');
    }
    const doctor = await getDoctorIdFromDb(req.userId);

    const myPatients = await getMyPatients(doctor.id);
    res.status(200).json({
        message: "My Patients", 
        myPatients: myPatients
    });
});
export{
    registerDoctorController,
    getDoctorProfileController,
    getMyServicesController,
    getMyPatientsController
};