const multer =  require('multer') 

const path = require('path')
const fs = require('fs')
const multerStorage = multer.diskStorage({
    destination: function (req, file, cb) {
      // Vous n'avez pas besoin de définir un dossier local, car les fichiers iront directement à Cloudinary
      cb(null, '');
    },
    filename: function (req, file, cb) {
      const suffixUnique = Date.now() + '-' + Math.round(Math.random()) * 1e9;
      cb(null, file.fieldname + '-' + suffixUnique + '.jpg');
    },
  });
const multerFilter=(req,file,cb)=>{
if(file.mimetype.startsWith('image')){
    cb(null,true)
}else{
    cb({
        message:"unsupported file format"
    })
}
}

const uploadPhoto = multer({
    storage:multerStorage,
    fileFilter:multerFilter,
   
})


module.exports = {uploadPhoto}