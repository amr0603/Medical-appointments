const express = require("express");
const router = express .Router();
const validate = require("../Validation/validate");
const {AppointmentValidationSchema}=require("../Validation/AppointmentValidation");
const {CreateAppointment, getAppointments}= require ("../Authcontrollers/Appointmentcontroller");

const { Token, checkRole } = require("../Middleware/Middleware");



//المريض بس هو اللي يقدر يعمل حجز جديد
router.post("/",Token, checkRole("patient"), validate(AppointmentValidationSchema), CreateAppointment);

// الإدارة والموظفين بس هم اللي يقدروا يعرضوا لستة كل الحجوزات اللي في العيادة
router .get ("/", Token, checkRole("admin", "staff"),getAppointments);

module.exports = router;