const express = require("express");
const router = express.Router();
const validate= require("../Validation/validate");
const {MedicaiValidationSchema}=require("../Validation/MedicalValidation");
const {createMedicalRecord,getMedicalRecord}= require("../Authcontrollers/MedicalRecordcontroller")

const {token,checkRole}=require("../Middleware/Middleware")



router.post("/",token,checkRole("doctor"),validate(MedicaiValidationSchema),createMedicalRecord);

router.get("/:id",token,checkRole,getMedicalRecord);

module.exports=router;