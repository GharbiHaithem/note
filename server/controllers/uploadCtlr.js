const {cloudinarUploadImg,cloudinarDeleteImg}= require('../utils/cloudinary')
const fs = require('fs')
const uploadImageCtrl = {
  uploadImages: async (req, res) => {
      try {
          const uploader = (path) => cloudinarUploadImg(path); // Supprimez 'images' si ce n'est pas nécessaire
          const urls = [];
          const files = req.files;
          for (const file of files) {
              const { path } = file;
              const newPath = await uploader(path);
              urls.push(newPath);
              fs.unlinkSync(path);
          }
          const images = urls.map((file) => file);
          console.log(images);
          res.json(images);
      } catch (error) {
          res.json({ message: error.message });
      }
  },

  deleteImages: async (req, res) => {
    const { id } = req.params;
  
    try {
      const deletedImgInfo = await cloudinarDeleteImg(id);
      res.json({ deletedImgInfo });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}
module.exports = {uploadImageCtrl}