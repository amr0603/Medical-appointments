
const express = require('express');
const router = express.Router();

const validate =require("../Validation/validate");
const PatientProfileSchema = require("../Validation/PatientValidation");

const{ createPatientProfile,getPatientId,getallPatients}=require("../Authcontrollers/Patientcontroller");

const {token,checkRole}=require("../Middleware/Middleware")



router.post('/profile', token,validate(PatientProfileSchema), createPatientProfile);
router.get('/profiles', token, checkRole("doctor"), getallPatients);
router.get('/profiles/:id', token, getPatientId);


module.exports = router;