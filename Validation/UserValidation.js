const joi =require("joi");
 
const registerSchema = joi.object({
username:joi.string().min(6).max(50).required(),
email:joi.string().email().required(),
password:joi.string().min(6).required(),
role:joi.string().valid("patient", "doctor", "staff", "admin").default('patient').required(),
secretCode: joi.string().allow('').optional()
});


const loginSchema = joi.object({
email:joi.string().email().required(),
password:joi.string().min(6).required()
});

module.exports = {
    registerSchema,
loginSchema
}
