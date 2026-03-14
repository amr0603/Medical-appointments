//User Model — الاسم، الإيميل، الباسورد، الرتبة (patient / doctor / staff)

const mongoose = require("mongoose");

const userSchema =new mongoose.Schema({
    username:{
        type:String,
        required:true,  
        trim :true //علشان  لو المستخدم دخل مسافات بالغلط قبل أو بعد
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim :true , 
        lowercase:true
    },
    password:{
        type:String,    
        required:true
    },
    role:{
        type:String,
        enum:["patient","doctor","staff", "admin"],
        required:true
    },
},{timestamps:true}); //بتضيف حقلين تلقائياً (createdAt و updatedAt) عشان تعرف إمتى الحساب اتعمل وإمتى اتعدل.

const User = mongoose.model("User", userSchema);

module.exports = User;