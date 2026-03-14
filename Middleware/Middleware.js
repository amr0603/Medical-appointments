const Jwt =require("jsonwebtoken");

const token = async(req , res,next)=>{
    const authHeader = req.headers.authorization;

    if(!authHeader ||!authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message:"not"  });

    }
    const token = authHeader.split(" ")[1];
    try {
        const decode= Jwt.verify(token,process.env.JWT_SECRET);
        req.user=decode;
        next();
    } catch (error) {
        return res.status(401).json({message:"the token not avilable"});
    }
    };


    
    const checkRole = (...allowedRoles) => {
    return (req, res, next) => {
        // 1. نتأكد إن الـ verifyToken اشتغل الأول وحفظ بيانات اليوزر
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized. User not found." });
        }

        // 2. نقارن رتبة اليوزر بالرتب المسموح بيها للـ Route ده
        if (!allowedRoles.includes(req.user.role)) {
            return res.status(403).json({ 
                message: "Access Denied. You do not have permission to perform this action." 
            });
        }

        // 3. لو الرتبة مظبوطة، كمل للخطوة اللي بعدها
        next();
    };
}

    module.exports={token,checkRole};



