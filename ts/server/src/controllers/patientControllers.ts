import { NextFunction, Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import createError from 'http-errors';
import logger from '@src/config/logger';
import { getPatientIdFromDb, getMyDoctors,getMyServices } from '@src/db/patientQuaries';
const NAMESPACE = 'PatientController';

const getMyDoctorsController = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {   
    console.log("getMyDoctorsController");
    
    if(!req.userId){
        throw createError.InternalServerError('');
    }
    const patient = await getPatientIdFromDb(req.userId);
        
    const myDoctors = await getMyDoctors(patient.id);

    res.status(200).json({
        message: "My Doctors", 
        myDoctors: myDoctors
    });
});

const getMyServicesController = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {   
    
    if(!req.userId){
        throw createError.InternalServerError('');
    }
    const patient = await getPatientIdFromDb(req.userId);
        
    const myServices = await getMyServices(patient.id);

    res.status(200).json({
        message: "My Services", 
        myServices: myServices
    });
});
export{
    getMyDoctorsController,
    getMyServicesController
};