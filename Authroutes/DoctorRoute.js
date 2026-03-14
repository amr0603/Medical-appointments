const express = require("express");
const router = express.Router();
const validate= require("../Validation/validate");
const {DoctorValidationSchema}=require("../Validation/DoctorValidation");


const { createDoctorProfile,getDoctorProfileById,getalldocters} = require("../Authcontrollers/Doctorcontroller");
// الدكتور بس هو اللي يقدر يعمل البروفايل بتاعه
router.post("/",Token, checkRole("doctor"),validate(DoctorValidationSchema),createDoctorProfile);


router.get("/:id",Token ,getDoctorProfileById);
router.get("/", verifyToken, getalldocters);
module.exports = router;