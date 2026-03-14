// Medical Record Model — التشخيص، الروشتة، مرتبط بالمريض والطبيب

const mongoose = require("mongoose");
const medicalRecordSchema = new mongoose.Schema({
    diagnosis:{ 
        type:String,
        
    },
    prescription:{// راي الباشا مهندس
        type:String,
        
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
    },
    addedBy: {
        type: String,
        enum: ['patient', 'doctor'],
        required: true
    },
    appointment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Appointment",
    required: true
}//عشان لو مريض كشف عند نفس الدكتور 5 مرات، نبقى عارفين الروشتة دي بتاعة أي حجز فيهم.
},
{timestamps:true});

const MedicalRecord = mongoose.model("MedicalRecord", medicalRecordSchema);
module.exports = MedicalRecord;
