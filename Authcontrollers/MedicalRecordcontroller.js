const Medicalrecord = require("../models/MedicalRecord");
// Create a new medical record
const createMedicalRecord = async (req, res) => {
    try {
        const { diagnosis, prescription, notes, images, patientId, doctorId } = req.body;
        const medicalRecord = new Medicalrecord({
            diagnosis,
            prescription,   
            notes,
            images,
            patient: patientId,
            doctor: doctorId
        }); 
        await medicalRecord.save();
        res.status(201).json(medicalRecord);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const getMedicalRecord = async (req, res) => {
    try {
        const medicalRecord = await Medicalrecord.findById(req.params.id);
        if (!medicalRecord) {
            return res.status(404).json({ message: "Medical record not found" });
        }
        res.status(200).json(medicalRecord);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

module.exports = {
    createMedicalRecord,
    getMedicalRecord
};
