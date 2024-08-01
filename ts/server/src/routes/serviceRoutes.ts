import express from 'express';
import { 
    createServiceController,
} from '@src/controllers/serviceControllers';
import { 
    createServiceSchema
} from '@src/validators/serviceValidators';
import {
    validate
} from '@src/middlewares/validationMiddleware';

import { authenticate } from '@src/middlewares/authenticationMiddleware';
import { authorize } from '@src/middlewares/authorizationMiddleware';

const router = express.Router();
router.post('/create',authenticate,authorize('Patient','Admin'),validate(createServiceSchema),createServiceController)
export default router;