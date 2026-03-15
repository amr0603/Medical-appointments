require("dotenv").config();
const express =require("express");
const app=express()
const mongoose = require("mongoose");
const PORT = process.env.PORT;
app.use(express.json())
const connectDB = async(req, res)=>{
    try {
        await mongoose.connect(process.env.DB_URI)
        console.log("Database connected successfully")
    } catch (error) {
        console.log("Database connection failed", error)
    }
}
connectDB();


const doctorRoutes = require("./Authroutes/DoctorRoute");
const userRoutes = require("./Authroutes/UserRoute");
const appointmentRoutes =require("./Authroutes/AppointmentRoute");
 const medicalRoutes = require("./Authroutes/MedicalRecordRoute");


app.use("/api/users", userRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/medical-records", medicalRoutes);



console.log(PORT)

app.listen(PORT,()=>{

    console.log(`Server running on port${PORT}`)
})