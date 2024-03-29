const mongoose = require('mongoose')
const recetteSchema =new mongoose.Schema({
 title : {
    type:String,
    required:true
 },
 description:{
    type:String,
    required:true

 },
 images:[{
   public_id:String,
   url:String
}],
 user:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
 category:{
    type:mongoose.Schema.Types.ObjectId,ref:'Category'
 }},{
    timestamps:true
 }
 )
module.exports = mongoose.model("Recette" ,recetteSchema )