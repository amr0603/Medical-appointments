const express = require("express");
const router = express.Router();
const validate= require("../Validation/validate");
const {MedicaiValidationSchema}=require("../Validation/MedicalValidation");
const {createMedicalRecord,getMedicalRecord}= require("../Authcontrollers/MedicalRecordcontroller")

const token=require("../Middleware/Middleware")


router.post("/",token,validate(MedicaiValidationSchema),createMedicalRecord);
router.get("/:id",token,getMedicalRecord);

module.exports=router;