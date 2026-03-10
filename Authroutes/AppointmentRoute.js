const express = require("express");
const router = express .Router();
const validate = require("../Validation/validate");
const {AppointmentValidationSchema}=require("../Validation/AppointmentValidation");
const {CreateAppointment, getAppointments}= require ("../Authcontrollers/Appointmentcontroller");
router.post("/", validate(AppointmentValidationSchema), CreateAppointment);
router .get ("/", getAppointments);

module.exports = router;