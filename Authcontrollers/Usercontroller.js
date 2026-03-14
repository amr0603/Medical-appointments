const  User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");



const register = async(req , res)=>{
    try {
        const{username ,email , password, role}=req.body



        if (role==="admin" || role === "staff"){
            return res.status(403).json({ message:"not be create acount"})
        }

            const existingUser =await User.findOne({email});
            if (existingUser) return res.status(400).json({message :"This email already exists",/*data:existingUser*/});
                
                const  bcryptpassword=await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(password ,bcryptpassword);

                const newUser= await User.create({
                    username ,email ,role,
                     password : hashedPassword,
                });
                res.status(201).json({message :"Registration completed successfully",data:newUser});
        
    } catch (error) {
        res.status(500).json({message :"An error occurred during registration",data:error.message});
        
    }
};



const login =async(req , res)=>{
    try{
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res.status(401).json({ message: " Not Found email or password" });

    
    const matchPassword = await bcrypt.compare(password, user.password);
    if (!matchPassword)
      return res.status(401).json({ message: "Invalid Password" });

        const token = jwt.sign(
      {
        id: user._id,   
        role: user.role, },
        process.env.JWT_SECRET,
        {
            expiresIn: "1d",
        },
    );
    res.status(200).json({
        msg: "Success Login",
        token,
    });
    } catch (error) {
        res.status(500).json({message :"An error occurred during login" ,data:error.message});
    }
};

module.exports = {
    register,
    login
};