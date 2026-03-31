const Appointment = require("../models/Appointment");
const DoctorProfile = require("../models/DoctorProfile");

const CreateAppointment = async (req , res)=>{
try {
    const { doctor  , slotTime } = req.body;
    const patient = req.user.id;

const timedate = new Date(slotTime);
//بتتأكد إن صيغة الوقت صحيحة
if (isNaN(timedate.getTime())) {
    return res.status(400).json({ message: "Invalid slot time format" });
}
//بتتأكد إن الموعد مش في الماضي
if (timedate < new Date()) {
    return res.status(400).json({ message: "Cannot book a slot in the past" });
}
//بتتأكد إن الموعد ده مش محجوز لنفس الدكتور
const existingAppointment = await Appointment.findOne({ 
    doctor: doctor, 
    slotTime: timedate 
});

if (existingAppointment) {
    return res.status(400).json({ message: "This slot is already booked" });
}
const appointment =await Appointment.create({
    patient: patient,
    doctor: doctor,   
    slotTime: timedate,
    status: "pending"
});
res.status(201).json(appointment);

} catch (error) {
    return res.status(500).json({ message: "Error creating appointment", error: error.message });
}
};





const getAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find()
        .populate("patient", "username email") 
            .populate("doctor", "username email");//هترجع البيانات كأرقام
        res.status(200).json(appointments);
    } catch (error) {
        res.status(500).json({ message: "Error fetching appointments", error: error.message });
    }       
};

const getMyAppointments = async (req, res) => {
    try {
        const userId = req.user.id;
        const role = (req.user.role || "").toLowerCase();

        let query = {};

        if (role === "doctor") {
            // Support legacy data where appointment.doctor might contain DoctorProfile._id instead of User._id
            const profiles = await DoctorProfile.find({ doctor: userId }).select("_id");
            const legacyDoctorIds = profiles.map((p) => p._id);
            query = { doctor: { $in: [userId, ...legacyDoctorIds] } };
        } else {
            query = { patient: userId };
        }

        const appointments = await Appointment.find(query)
            .populate("patient", "username email")
            .populate("doctor", "username email")
            .sort({ slotTime: -1 });

        res.status(200).json(appointments);
    } catch (error) {
        res.status(500).json({ message: "Error fetching appointments", error: error.message });
    }
};

const getAppointmentById = async (req, res) => {
    try {
        const { id } = req.params;
        const role = (req.user.role || "").toLowerCase();
        const appointment = await Appointment.findById(id)
            .populate("patient", "username email")
            .populate("doctor", "username email");

        if (!appointment) {
            return res.status(404).json({ message: "Appointment not found" });
        }

        if (role === "admin" || role === "staff") {
            return res.status(200).json(appointment);
        }

        const userId = String(req.user.id);
        const isOwner = String(appointment.patient) === userId || String(appointment.doctor) === userId;
        if (!isOwner) {
            return res.status(403).json({ message: "Access Denied. You do not have permission to view this appointment." });
        }

        return res.status(200).json(appointment);
    } catch (error) {
        return res.status(500).json({ message: "Error fetching appointment", error: error.message });
    }
};

const updateAppointment = async (req, res) => {
    try {
        const { id } = req.params;
        const { slotTime } = req.body;

        const appointment = await Appointment.findById(id);
        if (!appointment) {
            return res.status(404).json({ message: "Appointment not found" });
        }

        if (String(appointment.patient) !== String(req.user.id)) {
            return res.status(403).json({ message: "You do not have permission to edit this appointment" });
        }

        if (appointment.status === "cancelled" || appointment.status === "completed") {
            return res.status(400).json({ message: "This appointment can no longer be rescheduled" });
        }

        const timedate = new Date(slotTime);
        if (isNaN(timedate.getTime())) {
            return res.status(400).json({ message: "Invalid slot time format" });
        }

        if (timedate < new Date()) {
            return res.status(400).json({ message: "Cannot book a slot in the past" });
        }

        const existingAppointment = await Appointment.findOne({
            doctor: appointment.doctor,
            slotTime: timedate,
            _id: { $ne: appointment._id },
        });

        if (existingAppointment) {
            return res.status(400).json({ message: "This slot is already booked" });
        }

        appointment.slotTime = timedate;
        if (!appointment.status) {
            appointment.status = "pending";
        }
        await appointment.save();

        const populated = await Appointment.findById(appointment._id)
            .populate("patient", "username email")
            .populate("doctor", "username email");

        return res.status(200).json(populated);
    } catch (error) {
        return res.status(500).json({ message: "Error updating appointment", error: error.message });
    }
};

const updateAppointmentStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const role = (req.user.role || "").toLowerCase();

        const allowed = ["pending", "confirmed", "completed", "cancelled"];
        if (!allowed.includes(status)) {
            return res.status(400).json({ message: "Invalid status value" });
        }

        const appointment = await Appointment.findById(id);
        if (!appointment) {
            return res.status(404).json({ message: "Appointment not found" });
        }

        if (role === "doctor" && String(appointment.doctor) !== String(req.user.id)) {
            return res.status(403).json({ message: "You do not have permission to update this appointment" });
        }

        appointment.status = status;
        await appointment.save();

        const populated = await Appointment.findById(appointment._id)
            .populate("patient", "username email")
            .populate("doctor", "username email");

        return res.status(200).json(populated);
    } catch (error) {
        return res.status(500).json({ message: "Error updating appointment status", error: error.message });
    }
};

const cancelAppointment = async (req, res) => {
    try {
        const { id } = req.params;
        const appointment = await Appointment.findById(id);

        if (!appointment) {
            return res.status(404).json({ message: "Appointment not found" });
        }

        if (String(appointment.patient) !== String(req.user.id)) {
            return res.status(403).json({ message: "You do not have permission to cancel this appointment" });
        }

        appointment.status = "cancelled";
        await appointment.save();
        return res.status(200).json(appointment);
    } catch (error) {
        return res.status(500).json({ message: "Error cancelling appointment", error: error.message });
    }
};

// const getAvailableSlots = async (req, res) => {
//     try {
//         const {doctorid}=req.body;
//         const {workingDays, availableHours,}=req.body;
//         const appointments = await Appointment.find();
//         res.status(200).json(appointments);
//     } catch (error) {
//         res.status(500).json({ message: "Error fetching appointments", error: error.message });
//     }       
// };

module.exports = {
    CreateAppointment,
    getAppointments,
    getMyAppointments,
    getAppointmentById,
    updateAppointment,
    updateAppointmentStatus,
    cancelAppointment,
   
};  
