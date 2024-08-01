const Joi = require('joi');

const registerValidatorScheme = Joi.object({
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().min(8).max(30).required()
    //.pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,30}$'))
});
const loginValidatorScheme = Joi.object({    
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().min(8).max(30).required()
    //.pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,30}$'))
});
export { 
    registerValidatorScheme,
    loginValidatorScheme
};  