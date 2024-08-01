import express from 'express';
import {
    getDoctorProfileController,getMyServicesController,getMyPatientsController
} from '@src/controllers/doctorControllers';
import { authenticate } from '@src/middlewares/authenticationMiddleware';
import { authorize } from '@src/middlewares/authorizationMiddleware';

const router = express.Router();
router.get('/get-my-patients',authenticate,authorize('Doctor','Admin'),getMyPatientsController);
router.get('/get-my-services',authenticate,authorize('Doctor','Admin'),getMyServicesController);
router.get('/:id',getDoctorProfileController);

export default router;