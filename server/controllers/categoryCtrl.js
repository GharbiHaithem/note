const Category = require('../models/Category')
const categoryCtrl = {
    createCat: async(req,res)=>{
        try {
            const {_id} = req.user
            console.log({"userrr":req.user})
            const findCat = await Category.find()
            if(_id=== undefined){
              return res.status(404).json({message:"Authentification required"})
            }
    
            const isTitleExist = await Category.exists({ titleCategory: req.body.title.toUpperCase() });

            if (isTitleExist) {
              return res.status(401).json({ message: "This title already exists" });
            }
    
            const newtitle = await Category.create({
                titleCategory:req.body.title.toUpperCase(),
                user:_id
            })   
            return res.status(201).json({message:"category created" , newtitle})
    
        } catch (error) {
            return res.status(500).json({message:error.message})
        }
    },
    categories:async(req,res)=>{
        try {
            const{_id} = req.user
            if(_id === undefined){
             return   res.status(500).json({message:"authentification is required"})
            }
            const cats = await Category.find({user:_id}).populate("user")
          return  res.status(201).json(cats)
        } catch (error) {
         return   res.status(500).json({message:error.message})
        }
    }
    
} 
module.exports = categoryCtrl