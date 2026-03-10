const Appointment = require("../models/Appointment");

const CreateAppointment = async (req , res)=>{
try {
    const { patient , doctor , slotTime } = req.body;

const timedate = new Date(slotTime);

if (isNaN(timedate.getTime())) {
    return res.status(400).json({ message: "Invalid slot time format" });
}
if (timedate < new Date()) {
    return res.status(400).json({ message: "Cannot book a slot in the past" });
}
const existingAppointment = await Appointment.findOne({ 
    doctor: doctor, 
    slotTime: timedate 
});

if (existingAppointment) {
    return res.status(400).json({ message: "This slot is already booked" });
}
const appointment = new Appointment({
    patient: patient,
    doctor: doctor,   
    slotTime: timedate
});

await appointment.save();
res.status(201).json(appointment);

} catch (error) {
    return res.status(500).json({ message: "Error creating appointment", error: error.message });
}
};



const getAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find();
        res.status(200).json(appointments);
    } catch (error) {
        res.status(500).json({ message: "Error fetching appointments", error: error.message });
    }       
};

module.exports = {
    CreateAppointment,
    getAppointments
};  