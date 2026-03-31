const joi= require("joi");
const DoctorValidationSchema=joi.object({
name:joi.string().min(5).max(50).required(),
email:joi.string().email().required(),
MobileNumber: joi.string().length(11).pattern(/^[0-9]+$/).required(),// ده بس من  chat gpt
specialization:joi.string().required(),
consultationFee:joi.number().required(),
workingDays: joi.array().items(joi.string()).required(), 
availableHours: joi.array().required(), // راي الباشا مهندش
  doctorId: joi.string().optional()
  });


const DoctorUpdateSchema=joi.object({
name:joi.string().min(5).max(50).required(),
email:joi.string().email().required(),
MobileNumber: joi.string().length(11).pattern(/^[0-9]+$/).required(),
specialization:joi.string().required(),
consultationFee:joi.number().required(),
workingDays: joi.array().items(joi.string()).required(), 
availableHours: joi.array().required(),
});

module.exports={DoctorValidationSchema,DoctorUpdateSchema};
