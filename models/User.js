//User Model — الاسم، الإيميل، الباسورد، الرتبة (patient / doctor / staff)

const mongoose = require("mongoose");

const userSchema =new mongoose.Schema({
    username:{
        type:String,
        required:true   
    },
    email:{
        type:String,
        required:true,
        unique:true
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
},{timestamps:true}); 

const User = mongoose.model("User", userSchema);

module.exports = User;