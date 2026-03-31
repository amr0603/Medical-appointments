const joi = require("joi");

const AppointmentValidationSchema = joi.object({
  // Patient is derived from the auth token in the controller; if the client sends it, strip it.
  patient: joi.any().strip(),
  doctor: joi.string().required(),
  slotTime: joi.date().iso().required(),
});

module.exports = { AppointmentValidationSchema };
