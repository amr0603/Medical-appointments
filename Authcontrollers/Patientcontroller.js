
const PatientProfile = require("../models/PatientProfile");

const createPatientProfile = async(req , res)=>{
try {
    const { name ,email, age ,phone ,dateofbirth,gender, bloodtype , chronicDiseases,notes ,address }=req.body;
    const userId = req.user.id;

    const existingPatient = await PatientProfile.findOne({email});
     if (existingPatient) {
        return res.status(400).json({ message: "Patient profile with this email already exists" });
     }

    const newPatient = await PatientProfile.create({
         name ,
         email,
          age ,
          phone ,
          dateofbirth,
          gender,
           bloodtype ,
          chronicDiseases,
           notes ,
           address,
          user:userId
    });
    res.status(201).json({ 
        message: "patient profile created successfully",  
        data: newPatient
    });

} catch (error) {
      res.status(500).json({ message: "Error creating patient profile", error: error.message});
}

};



const getPatientId=async(req , res)=>{

try {
    const patient = await PatientProfile.findOne(req.params.id);
    if(!patient) return res.status(404).json({ message: "patient profile not found" });
     res.status(200).json(patient);
} catch (error) {
     res.status(500).json({ message: "Error fetching patient profile", error });
}
};

 const getallPatients = async (req , res)=>{

try {
    const Patients = await PatientProfile.find();
    if(!Patients) return res.status(404).json({ message: "patient profile not found" });
     res.status(200).json(Patients);
} catch (error) {
     res.status(500).json({ message: "Error fetching patient profile", error });
}
};
  

module.exports = {
   createPatientProfile,
   getPatientId,
   getallPatients
};