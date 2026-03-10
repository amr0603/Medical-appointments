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

//التجهيز للصور المرفوعة: في MedicalRecord.js، قمت بتجهيز حقل images ليحتوي على url و public_id. هذا يوضح أنك تخطط لاستخدام خدمات سحابية مثل Cloudinary مستقبلاً، وهو تفكير ممتاز!
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
