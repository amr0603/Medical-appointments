//Doctor Profile Model — التخصص، سعر الكشف، أيام العمل، الساعات المتاحة

const mongoose = require("mongoose");
const doctorProfileSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    MobileNumber:{
        type:String,
        required:true,
    },  
    specialization:{
        type:String,    
        required:true
    },
    consultationFee:{ 
        type:Number,
        required:true
    },
    workingDays:[String],//مصفوفة
    availableHours:[String],

    doctor:{ // تم الرابط مع User 
        type :mongoose .Schema.Types.ObjectId,
        ref :"User",// 
        required:true
    }
},{timestamps:true});   

const DoctorProfile = mongoose.model("DoctorProfile", doctorProfileSchema);

module.exports = DoctorProfile;


// availability: [{ راى الباشا مهندس
//     day: { type: String },
//     startTime: { type: String },
//     endTime: { type: String }
// }]