const Joi = require('joi');
const createConnectionScheme = Joi.object({    
    doctor_name: Joi.string().lowercase().min(1).required()
});
export { 
    createConnectionScheme
};  