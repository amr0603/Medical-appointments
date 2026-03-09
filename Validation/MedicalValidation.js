const joi = require("joi");

const MedicaiValidationSchema= joi.object({

diagnosis:joi.string().required(),
prescription:joi.string().required(),
notes:joi.string().required(),
// images:joi.string().required(),
// patient:joi.string().required(),
// doctor:joi.string().required()
});
module.exports={MedicaiValidationSchema};