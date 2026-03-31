
const joi =require("joi");

const PatientProfileSchema = joi.object({
name:joi.string().min(5).max(50).required(),
email: joi.string().email().required(),
age:joi.number().min(0).required(),
phone: joi.string().length(11).pattern(/^[0-9]+$/).required(),// ده بس من  chat gpt
dateofbirth:joi.string().required(),
gender:joi.string().valid("Male", "Female").required(),
bloodtype: joi.string().valid('A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-').required(), 
chronicDiseases:joi.array().items(joi.string()).default([]),
notes:joi.string(),
address:joi.string().required(),
 patientId: joi.string().required()
});
module.exports = PatientProfileSchema;