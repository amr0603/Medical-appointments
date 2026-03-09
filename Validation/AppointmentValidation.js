const joi= require("joi");

const AppointmentValidationSchema =joi.object({

patient:joi.string().required(),
doctor:joi.string().required(),
slotTime:joi.string().required(),
});
module.exports={AppointmentValidationSchema};