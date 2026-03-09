const express = require("express");
const router = express.Router();
const validate= require("../Validation/validate");
const {DoctorValidationSchema}=require("../Validation/DoctorValidation");
const { createDoctorProfile, getDoctorProfileById } = require("../Authcontrollers/Doctorcontroller");

router.post("/doctor_profile", createDoctorProfile);
router.get("/doctor_profile/:id",validate(DoctorValidationSchema), getDoctorProfileById);
module.exports = router;