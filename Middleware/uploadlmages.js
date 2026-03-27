const multer= require("muoter");
const path = require("path");

const storage =multer.diskstorage({
    destination:(req , file,cb)=>{
        cb(null,"uploads");
    },
    filename:(req ,file ,cb)=>{
        cb(null ,Date.now()+path.extname(file.orginalname)
 )}
});

const upload=multer({storage});

const uploadImage = upload.array("images", 5);

module.exports=uploadImage;