// //Appointment Model — PatientID + DoctorID + SlotTim
const mongoose =require("mongoose");
const appointmentSchema = new mongoose.Schema({
    patient:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",     
        required:true
    },//patient و doctor: مربوطين بـ User عشان نعرف مين حجز عند مين
    doctor:{    
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    slotTime:{ //عشان يسجل وقت وتاريخ الحجز
        type:Date,
        required:true
    }

},{timestamps:true});   

const Appointment = mongoose.model("Appointment", appointmentSchema);

module.exports = Appointment;

// status: {
//     type: String,
//     enum: ['pending', 'confirmed', 'completed', 'cancelled'], // قيد الانتظار، مؤكد، مكتمل، ملغي
//     default: 'pending'
// }