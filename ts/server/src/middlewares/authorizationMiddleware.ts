import asyncHandler from 'express-async-handler';
import { NextFunction, Request, Response } from 'express';
import logger from '@src/config/logger';
import createError from 'http-errors';


const NAMESPACE = 'AuthorizationMiddleware';

const authorize = (...allowedRoles : string[] ) => asyncHandler( async (req: Request, res: Response, next: NextFunction) => {
    if(req.role && allowedRoles.includes(req.role)){
        return next();
    }
    logger.error(NAMESPACE, "Not allowed", "authorize");
    return next(createError.Forbidden('Not allowed'));
});



export { authorize };