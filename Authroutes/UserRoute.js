const   express = require('express');
const router = express.Router();
const validate= require("../Validation/validate");
const {    registerSchema,loginSchema}=require("../Validation/UserValidation")
const { register , login} = require("../Authcontrollers/Usercontroller");

router.post("/register",validate( registerSchema,loginSchema), register);
router.post("/login", login);

module.exports = router;
