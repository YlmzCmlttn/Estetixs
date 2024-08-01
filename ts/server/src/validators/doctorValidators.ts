import { NextFunction, Request, Response } from 'express';
import logging from '@src/config/logger';
const NAMESPACE = 'AuthValidator';

const registerDoctorValidator = async (req: Request, res: Response, next: NextFunction) => {    
    logging.debug(NAMESPACE, `Register Doctor validator called.`);
    next();
};

export { 
    registerDoctorValidator
};