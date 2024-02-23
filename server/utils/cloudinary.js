const cloudinary = require("cloudinary")
cloudinary.config({
  cloud_name: "dblkrot85",
  api_key: "786779564615498",
  api_secret: "0wDogjHc7uDzx7Rg847GEeC2Xu0"
});

const cloudinarUploadImg = (fileUpload, onFileProgress) => {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.v2.uploader.upload_stream(
        { resource_type: "auto" },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve({
              url: result.secure_url,
              asset_id: result.asset_id,
              public_id: result.public_id
            });
          }
        }
      );
  
      // Événement de progression
      uploadStream.on('progress', (progress) => {
        // La fonction onFileProgress est appelée avec l'objet progress
        onFileProgress(progress);
      });
  
      // Lire le fichier et le téléverser
      const fileReader = require('fs').createReadStream(fileUpload);
      fileReader.pipe(uploadStream);
    });
  };
  
  
const cloudinarDeleteImg = async (fileDelete) => {
    console.log(fileDelete)
    return new Promise((resolve, reject) => {
        cloudinary.uploader.destroy(fileDelete, (result) => {
          if (result.error) {
            reject(result.error);
          } else {
            resolve({
              message: 'Image supprimée avec succès!',
              deleted: result.result === 'ok', // Vérifie si l'image a été supprimée avec succès
              public_id:fileDelete
            });
          }
        }, {
          resource_type: "image", // Spécifiez le type de ressource comme "image"
        });
      });
}

module.exports = { cloudinarUploadImg, cloudinarDeleteImg };
