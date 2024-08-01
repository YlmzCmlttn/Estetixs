// src/server.ts

import express from 'express';
import env from './config/env';
import cookieParser from 'cookie-parser';
import logging from './config/logger';
import { RedisHelper } from './config/redis';
import { PostgreSQLHelper } from './config/db';
import { notFound, errorHandler } from './middlewares/errorMiddleware';
import authRoutes from './routes/authRoutes';
import doctorRoutes from './routes/doctorRoutes';
import appointmentRoutes from './routes/appointmentRoutes';
import serviceRoutes from './routes/serviceRoutes';
import connectionRoutes from './routes/connectionRoutes';
import patientRoutes from './routes/patientRoutes';
const NAMESPACE = 'Server';

const PORT = env.PORT;

RedisHelper.connect();
PostgreSQLHelper.connect();

const app = express();
const cors = require('cors');


app.use((req, res, next) => {
    logging.info(NAMESPACE, `METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);
    res.on('finish', () => {
        logging.info(NAMESPACE, `METHOD: [${req.method}] - URL: [${req.url}] - STATUS: [${res.statusCode}] - IP: [${req.socket.remoteAddress}]`);
    });
    next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// app.use(cors({
//     origin: ['http://localhost:3000', 'http://192.168.1.52:3000'],  // replace with your application's origin
//     methods: ['GET', 'POST', 'PUT', 'DELETE'], // allowed methods
//     credentials: true, // enable credentials (cookies, etc.)
//     allowedHeaders: ['Content-Type', 'Authorization']
// }));


//Routes
app.use('/api/auth', authRoutes);
app.use('/api/doctor', doctorRoutes);
app.use('/api/appointment', appointmentRoutes);
app.use('/api/service', serviceRoutes);
app.use('/api/connection', connectionRoutes);
app.use('/api/patient', patientRoutes);

app.get('/', (req, res) => {
    res.send('Server is ready!');
});

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
    logging.success(NAMESPACE, `Server is running on http://localhost:${PORT}`);}
);
