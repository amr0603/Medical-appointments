const express = require("express"); 
const DoctorProfile = require("../models/DoctorProfile");   
// Create a doctor profile
const createDoctorProfile = async (req, res) =>{
try {
    const { name, email, MobileNumber, specialization, consultationFee, workingDays, availableHours } = req.body;
    if (!name || !email || !MobileNumber || !specialization || !consultationFee || !workingDays || !availableHours) {
        return res.status(400).json({ message: "All fields are required" });
    }
    const existingdoctor = await DoctorProfile.findOne({ email });
    if (existingdoctor) {
        return res.status(400).json({ message: "Doctor profile with this email already exists" });
    }
    const doctorProfile = new DoctorProfile({
        name,
        email,
        MobileNumber,
        specialization,
        consultationFee,
        workingDays,
        availableHours
    });
    await doctorProfile.save();
    res.status(201).json({ message: "Doctor profile created successfully" });
} catch (error) {
    res.status(500).json({ message: "Error creating doctor profile", error });
}

    };

// Get doctor profile by ID
const getDoctorProfileById = async (req, res) => {
    try {   
        const doctorProfile = await DoctorProfile.findById(req.params.id);
        if (!doctorProfile) {
            return res.status(404).json({ message: "Doctor profile not found" });
        }   
        res.status(200).json(doctorProfile);
    } catch (error) {
        res.status(500).json({ message: "Error fetching doctor profile", error });
    }
};

module.exports = {
    createDoctorProfile,
    getDoctorProfileById
};
   
