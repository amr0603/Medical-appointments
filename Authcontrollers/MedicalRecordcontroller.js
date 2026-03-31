const Medicalrecord = require("../models/MedicalRecord");
// Create a new medical record
const createMedicalRecord = async (req, res) => {
    try {
        const { diagnosis, prescription, notes, images, patientId, doctorId ,appointmentId} = req.body;
        const medicalRecord = new Medicalrecord({
            diagnosis,
            prescription,   
            notes,
            images,
            patient: patientId,
            doctor: doctorId,
            appointmentId:appointmentId,
            addedBy: 'doctor'
        }); 
        await medicalRecord.save();
        res.status(201).json(medicalRecord);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const getMedicalRecord = async (req, res) => {
    try {
        const medicalRecord = await Medicalrecord.findById(req.params.id)
        .populate("patient", "username") // هيرجع اسم المريض
            .populate("doctor", "username specialization");
        if (!medicalRecord) {
            return res.status(404).json({ message: "Medical record not found" });
        }
        res.status(200).json(medicalRecord);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
const uploadPatientDocument = async (req, res) => {
    try {
        // البيانات هتيجي من المريض
        const { notes, images, doctorId } = req.body;
        
        // الـ ID بتاع المريض هنجيبه من الـ Token (بعد ما نشغل الـ Middleware)
        const patientId = req.user.id; 

        const newDocument = await Medicalrecord.create({
            notes,
            images,
            patient: patientId,
            doctor: doctorId,
            addedBy: 'patient' // السيستم بيسجل إن المريض هو اللي رفعها
        }); 
        res.status(201).json({ message: "Document uploaded successfully", data: newDocument });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

module.exports = {
    createMedicalRecord,
    getMedicalRecord,
    uploadPatientDocument
};
