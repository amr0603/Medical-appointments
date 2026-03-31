const express = require("express");
const router = express .Router();
const validate = require("../Validation/validate");
const {AppointmentValidationSchema}=require("../Validation/AppointmentValidation");
const {CreateAppointment, getAppointments, getMyAppointments, getAppointmentById, updateAppointment, updateAppointmentStatus, cancelAppointment}= require ("../Authcontrollers/Appointmentcontroller");

const { token, checkRole } = require("../Middleware/Middleware");



//المريض بس هو اللي يقدر يعمل حجز جديد
router.post("/",token, checkRole("patient"), validate(AppointmentValidationSchema), CreateAppointment);

// الإدارة والموظفين بس هم اللي يقدروا يعرضوا لستة كل الحجوزات اللي في العيادة
router .get ("/", token, checkRole("admin", "staff"),getAppointments);

// Doctor + Patient: list only their own appointments
router.get("/my", token, checkRole("doctor", "patient"), getMyAppointments);

// Doctor + Patient + Admin/Staff: view appointment details (doctor/patient must be part of the appointment)
router.get("/:id", token, checkRole("doctor", "patient", "admin", "staff"), getAppointmentById);

// Patient: reschedule/cancel their own appointment
router.patch("/:id", token, checkRole("patient"), updateAppointment);
router.delete("/:id", token, checkRole("patient"), cancelAppointment);

// Doctor/Admin/Staff: update appointment status
router.patch("/:id/status", token, checkRole("doctor", "admin", "staff"), updateAppointmentStatus);

module.exports = router;
