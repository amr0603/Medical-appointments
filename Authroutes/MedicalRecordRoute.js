const express = require("express");
const router = express .Router();
const validate= require("../Validation/validate");
const {MedicaiValidationSchema}=require("../Validation/MedicalValidation");
const {createMedicalRecord, getMedicalRecord}= require("../Authcontrollers/MedicalRecordcontroller")

router.post("/medicalRecord",validate(MedicaiValidationSchema), createMedicalRecord);
router.get("/medicalRecord", getMedicalRecord);

module.exports=router;