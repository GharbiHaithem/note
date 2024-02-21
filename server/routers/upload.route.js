const express = require('express')
const { authMiddleware } = require('../config/authMiddlware')
const {uploadImageCtrl} = require('../controllers/uploadCtlr')
const {uploadPhoto}  =require('../middlware/upload.image')
const router = express.Router()
router.put('/upload',authMiddleware,uploadPhoto.array('images',10),uploadImageCtrl.uploadImages)
router.delete('/delete-img/:id',authMiddleware,uploadImageCtrl.deleteImages)

module.exports = router