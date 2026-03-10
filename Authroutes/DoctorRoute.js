const express = require("express");
const router = express.Router();
const validate= require("../Validation/validate");
const {DoctorValidationSchema}=require("../Validation/DoctorValidation");
const { createDoctorProfile,getDoctorProfileById} = require("../Authcontrollers/Doctorcontroller");

router.post("/",validate(DoctorValidationSchema),createDoctorProfile);
router.get("/:id",getDoctorProfileById);
module.exports = router;