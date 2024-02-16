const mongoose = require('mongoose')
const categorySchema =new mongoose.Schema({
 titleCategory : {
    type:String,
    required:true
 },
 user:{type:mongoose.Schema.Types.ObjectId,ref:'User'}
},{
    timestamps:true
})
module.exports = mongoose.model("Category" ,categorySchema )