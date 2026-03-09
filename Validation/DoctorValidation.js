const joi= require("joi");
const DoctorValidationSchema=joi.object({
name:joi.string().min(10).max(50).required(),
email:joi.string().email().required(),
MobileNumber:joi.string().min(11).max(11).required(),
specialization:joi.string().required(),
consultationFee:joi.number().required(),
workingDays: joi.array().items(joi.string()).required(), 
availableHours: joi.array().required() // راي الباشا مهندش
})

module.exports={DoctorValidationSchema};