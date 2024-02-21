const multer =  require('multer') 

const path = require('path')
const fs = require('fs')
const multerStorage = multer.diskStorage({
    destination:function(req,file,cb){
cb(null,path.join(__dirname,'../public/images'))
    },
    filename:function(req,file,cb){
const suffixUnique = Date.now() + "-" + Math.round(Math.random())* 1e9;
cb(null,file.fieldname+ "-" + suffixUnique + ".jpg") 
    }
})
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