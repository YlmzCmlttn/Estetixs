import express from 'express';
import { 
    createAppointmentController,
} from '@src/controllers/appointmentControllers';
import { 
    createAppointmentSchema
} from '@src/validators/appointmentValidators';

import {
    validate
} from '@src/middlewares/validationMiddleware';

import { authenticate } from '@src/middlewares/authenticationMiddleware';
import { authorize } from '@src/middlewares/authorizationMiddleware';

const router = express.Router();
router.post('/create',authenticate,authorize('Patient','Admin'),validate(createAppointmentSchema),createAppointmentController)
export default router;