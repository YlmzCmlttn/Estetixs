import { NextFunction, Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import createError from 'http-errors';
import logger from '@src/config/logger';
import { getUserWithUsernameFromDb } from '@src/db/authQuaries';
import { getDoctorIdFromDb } from '@src/db/doctorQuaries';
import { getPatientIdFromDb } from '@src/db/patientQuaries';
import { createAppointment } from '@src/db/appointmentQuaries';
const NAMESPACE = 'AppointmentController';

const createAppointmentController = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {   
    const {doctor_name,appointment_time} = req.validatedBody;
    
    if(!req.userId){
        throw createError.InternalServerError('');
    }
    const patient = await getPatientIdFromDb(req.userId);
        
    const doctor_user = await getUserWithUsernameFromDb(doctor_name);
    if(!doctor_user){
        logger.error(NAMESPACE, "Doctor not found: " + JSON.stringify({doctor_name,appointment_time}), "createAppointmentController");
        throw createError.NotFound(`Doctor not found`);
    }
    if(doctor_user.role !== 'Doctor'){
        logger.error(NAMESPACE, "User is not a doctor: " + JSON.stringify({doctor_name,appointment_time}), "createAppointmentController");
        throw createError.NotFound(`User is not a doctor`);
    }

    const doctor = await getDoctorIdFromDb(doctor_user.id);
    if(!doctor){
        logger.error(NAMESPACE, "Doctor not found: " + JSON.stringify({doctor_name,appointment_time}), "createAppointmentController");
        throw createError.NotFound(`Doctor not found`);
    }

    const appointment = await createAppointment(doctor.id,patient.id,appointment_time);
    res.status(201).json({
        message: "Appointment created successfully",
        appointment: {
            id: appointment.id,
            doctor_id: appointment.doctor_id,
            patient_id: appointment.patient_id,
            appointment_time: appointment.appointment_time
        }
    });
});
export{
    createAppointmentController
};