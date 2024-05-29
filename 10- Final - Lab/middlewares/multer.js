const multer = require("multer");

const storage = multer.diskStorage({
    filename: function (request, file, cb){
        cb(null, file.originalname)
    }
}); //Saves the Image Locally.

const upload = multer({
    storage: storage
}); //Uploads it.

module.exports = upload;