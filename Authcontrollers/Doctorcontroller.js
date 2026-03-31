const DoctorProfile = require("../models/DoctorProfile");

const createDoctorProfile = async (req, res) => {
  try {
    const { name, email, MobileNumber, specialization, consultationFee, workingDays, availableHours, doctorId } = req.body;

    const existingdoctor = await DoctorProfile.findOne({ email });
    if (existingdoctor) {
      return res.status(400).json({ message: "Doctor profile with this email already exists" });
    }

    const doctorProfile = await DoctorProfile.create({
      name,
      email,
      MobileNumber,
      specialization,
      consultationFee,
      workingDays,
      availableHours,
      doctor: req.user?.id || doctorId,
    });

    return res.status(201).json(doctorProfile);
  } catch (error) {
    return res.status(500).json({ message: "Error creating doctor profile", error: error.message });
  }
};

const getDoctorProfileMe = async (req, res) => {
  try {
    const doctorProfile = await DoctorProfile.findOne({ doctor: req.user.id });
    if (!doctorProfile) {
      return res.status(404).json({ message: "Doctor profile not found" });
    }

    return res.status(200).json(doctorProfile);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching doctor profile", error });
  }
};

const updateDoctorProfileMe = async (req, res) => {
  try {
    const update = {
      name: req.body.name,
      email: req.body.email,
      MobileNumber: req.body.MobileNumber,
      specialization: req.body.specialization,
      consultationFee: req.body.consultationFee,
      workingDays: req.body.workingDays,
      availableHours: req.body.availableHours,
    };

    const doctorProfile = await DoctorProfile.findOneAndUpdate(
      { doctor: req.user.id },
      update,
      { new: true }
    );

    if (!doctorProfile) {
      return res.status(404).json({ message: "Doctor profile not found" });
    }

    return res.status(200).json(doctorProfile);
  } catch (error) {
    return res.status(500).json({ message: "Error updating doctor profile", error: error.message });
  }
};

// Get doctor profile by ID
const getDoctorProfileById = async (req, res) => {
  try {
    const doctorProfile = await DoctorProfile.findById(req.params.id);
    if (!doctorProfile) {
      return res.status(404).json({ message: "Doctor profile not found" });
    }

    return res.status(200).json(doctorProfile);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching doctor profile", error });
  }
};

const getalldocters = async (req, res) => {
  try {
    let query = {};
    const { specialization } = req.query;
    if (specialization) {
      query.specialization = specialization;
    }

    const doctorsList = await DoctorProfile.find(query);
    return res.status(200).json({ doctorsList });
  } catch (error) {
    return res.status(500).json({ message: "Error fetching doctor profile", error });
  }
};

module.exports = {
  createDoctorProfile,
  getDoctorProfileMe,
  updateDoctorProfileMe,
  getDoctorProfileById,
  getalldocters,
};
