const Jwt =require("jsonwebtoken");

const token = async(req , res,next)=>{
    const authHeader = res.headers.authorization;

    if(!authHeader ||!authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message:"not"  });

    }
    const token = authHeader.split(" ")[1];
    try {
        const decode= Jwt.verify(token,process.env.JWT_SECRET);
        res.user=decode;
        next();
    } catch (error) {
        return res.status(405).json({message:"the token not avilable"});
    }
    };

    module.exports=token;



