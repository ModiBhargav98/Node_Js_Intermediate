const express = require("express");
const {uploadeFiles} = require("../controllers/uploadFileController");
const router = express.Router();
const multer = require("multer")
var stroage = multer.diskStorage({destination:function(req,file,cb){
    cb(null,"./public/files")
},
filename:function(req,file,cb){
    const uniqueSuffix = Date.now();
    cb(null,file.fieldname+ uniqueSuffix+"-"+file.originalname)
}})

var upload = multer({storage:stroage})


router.route("/uploadFile").post(upload.fields([
    {
        name:"file",
        maxCount:40
    }
]),uploadeFiles);

module.exports = router;
