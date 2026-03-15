const express = require("express");
const router = express.Router();
const validate= require("../Validation/validate");
const {DoctorValidationSchema}=require("../Validation/DoctorValidation");
const { createDoctorProfile,getDoctorProfileById,getalldocters} = require("../Authcontrollers/Doctorcontroller");

const {token,checkRole}=require("../Middleware/Middleware")
// الدكتور بس هو اللي يقدر يعمل البروفايل بتاعه
router.post("/",token, checkRole("doctor"),validate(DoctorValidationSchema),createDoctorProfile);


router.get("/:id",token ,getDoctorProfileById);
router.get("/", token, getalldocters);
module.exports = router;