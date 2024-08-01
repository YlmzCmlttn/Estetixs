const Joi = require('joi');
const createServiceSchema = Joi.object({    
    doctor_name: Joi.string().lowercase().min(1).required()
});
export { 
    createServiceSchema
};  