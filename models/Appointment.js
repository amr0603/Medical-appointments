// //Appointment Model — PatientID + DoctorID + SlotTim
const mongoose =require("mongoose");
const appointmentSchema = new mongoose.Schema({
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
    slotTime:{
        type:Date,
        required:true
    }
},{timestamps:true});   

const Appointment = mongoose.model("Appointment", appointmentSchema);

module.exports = Appointment;