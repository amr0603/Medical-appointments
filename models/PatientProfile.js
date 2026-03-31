const { string } = require("joi");
const mongoose = require("mongoose");
const patientSchema = new mongoose.Schema({

    name:{
        type :String,
         required:true
    },
    age:{
       type :Number,
         required:true 
    },
    phone: { 
        type: String, 
        required: true 
    },
    dateofbirth:{
        type: Date, 
        required: true
    },
    gender: { 
        type: String, 
        enum: ['Male', 'Female'], 
        required: true
    },
    bloodtype:{
        type: String, 
        enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
        default: 'Unknown'
    },
    chronicDiseases: { 
       type: [String],
        default: []
    },
    notes:{
        type: String 
    },
    address: { 
        type: String 
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required: true,
        unique: true
    }

},{timestamps:true});

const Patient =mongoose.model("Patient",patientSchema);

module.exports=Patient;