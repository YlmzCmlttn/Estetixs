import express from 'express';
import { 
    getMyDoctorsController,getMyServicesController,
} from '@src/controllers/patientControllers';

import { authenticate } from '@src/middlewares/authenticationMiddleware';
import { authorize } from '@src/middlewares/authorizationMiddleware';

const router = express.Router();
router.get('/get-my-doctors',authenticate,authorize('Patient','Admin'),getMyDoctorsController);
router.get('/get-my-services',authenticate,authorize('Patient','Admin'),getMyServicesController);
export default router;