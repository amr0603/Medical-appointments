// Medical Record Model — التشخيص، الروشتة، مرتبط بالمريض والطبيب

const mongoose = require("mongoose");
const medicalRecordSchema = new mongoose.Schema({
    diagnosis:{ 
        type:String,
        required:true
    },
    prescription:{
        type:String,
        required:true
    },
    notes: {
        type: String,
        default: ""
    },
    images: [
        {
            url: {
                type: String,
               
            },
            public_id: {
                type: String,
            
            },
            uploadedAt: {
                type: Date,
                default: Date.now
            }
        }
    ],


    patient:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    doctor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    }
},{timestamps:true});

const MedicalRecord = mongoose.model("MedicalRecord", medicalRecordSchema);
module.exports = MedicalRecord;
