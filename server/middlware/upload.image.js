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
      const fileExtension = path.extname(file.originalname).toLowerCase();
      cb(null, file.fieldname + '-' + suffixUnique + fileExtension);
    },
  });
  const multerFilter = (req, file, cb) => {
    const allowedFileTypes = ['image/jpeg', 'image/png', 'video/mp4', 'video/quicktime'];
    
    if (allowedFileTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb({
        message: 'Format de fichier non pris en charge',
      });
    }
  };
  
  const uploadPhoto = multer({
    storage: multerStorage,
    fileFilter: multerFilter,
  });
  


module.exports = {uploadPhoto}