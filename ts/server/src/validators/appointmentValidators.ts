const Joi = require('joi');
const createAppointmentSchema = Joi.object({    
    doctor_name: Joi.string().lowercase().min(1).required(),
    appointment_time: Joi.date().iso().required()    
});
export { 
    createAppointmentSchema
};  