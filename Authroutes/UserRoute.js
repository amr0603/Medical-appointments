const   express = require('express');
const router = express.Router();
const validate= require("../Validation/validate");
const {    registerSchema,loginSchema}=require("../Validation/UserValidation")
const { register , login} = require("../Authcontrollers/Usercontroller");

router.post("/register",validate( registerSchema), register);
router.post("/login", validate(loginSchema), login);

module.exports = router;
