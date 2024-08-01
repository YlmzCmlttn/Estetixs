import express from 'express';
import { 
    createConnectionController,
} from '@src/controllers/connectionControllers';
import { 
    createConnectionScheme
} from '@src/validators/connectionValidators';
import {
    validate
} from '@src/middlewares/validationMiddleware';

import { authenticate } from '@src/middlewares/authenticationMiddleware';
import { authorize } from '@src/middlewares/authorizationMiddleware';

const router = express.Router();
router.post('/create',authenticate,authorize('Patient','Admin'),validate(createConnectionScheme),createConnectionController);
export default router;