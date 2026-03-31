const express = require("express");
const router = express.Router();
const validate= require("../Validation/validate");
const {DoctorValidationSchema,DoctorUpdateSchema}=require("../Validation/DoctorValidation");
const { createDoctorProfile,getDoctorProfileById,getalldocters,getDoctorProfileMe,updateDoctorProfileMe} = require("../Authcontrollers/Doctorcontroller");

const {token,checkRole}=require("../Middleware/Middleware")
// الدكتور بس هو اللي يقدر يعمل البروفايل بتاعه
router.post("/",token, checkRole("doctor"),validate(DoctorValidationSchema),createDoctorProfile);

// Doctor only
router.get("/me", token, checkRole("doctor"), getDoctorProfileMe);
router.patch("/me", token, checkRole("doctor"), validate(DoctorUpdateSchema), updateDoctorProfileMe);

router.get("/:id",token ,getDoctorProfileById);
router.get("/", token, getalldocters);
module.exports = router;
