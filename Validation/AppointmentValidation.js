const joi= require("joi");

const AppointmentValidationSchema =joi.object({

patient:joi.string().required(),// راي الباشا مهندس 

doctor:joi.string().required(),// راي الباشا مهندس 
slotTime:joi.date().iso().required(),
});
module.exports={AppointmentValidationSchema}; 