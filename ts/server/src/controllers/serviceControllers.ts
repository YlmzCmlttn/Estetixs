import { NextFunction, Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import createError from 'http-errors';
import logger from '@src/config/logger';
import { getPatientIdFromDb } from '@src/db/patientQuaries';
import { getDoctorIdWithDoctorNameFromDb } from '@src/db/doctorQuaries';
import { createPatientDoctorConnection, checkPatientIsConnectedToDoctor } from '@src/db/serviceQuaries';
import { createService } from '@src/db/serviceQuaries';
const NAMESPACE = 'ServiceController';

const createServiceController = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {   
    const {doctor_name} = req.validatedBody;
    
    if(!req.userId){
        throw createError.InternalServerError('');
    }
    const patient = await getPatientIdFromDb(req.userId);
        
    const doctor = await getDoctorIdWithDoctorNameFromDb(doctor_name);
    if(!doctor){
        logger.error(NAMESPACE, "Doctor not found: " + JSON.stringify({doctor_name}), "createServiceController");
        throw createError.NotFound(`Doctor not found`);
    }

    const isConnected = await checkPatientIsConnectedToDoctor(patient.id,doctor.id);
    if(!isConnected){
        await createPatientDoctorConnection(patient.id,doctor.id);
    }
    
    const service = await createService(doctor.id,patient.id);
    if(!service){
        logger.error(NAMESPACE, "Service not created: " + JSON.stringify({doctor_name}), "createServiceController");
        throw createError.InternalServerError(`Service not created`);
    }
    res.status(201).json({
        message: "Service Created successfully",
        service: {
            id: service.id
        }
    });
});
export{
    createServiceController
};