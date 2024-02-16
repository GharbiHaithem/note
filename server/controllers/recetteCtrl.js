const Recette = require('../models/recette')
const recetteCtrl = {
    createRecette: async(req,res)=>{
        try {
            const {_id} = req.user
            console.log({"userrr":req.user})
           
            if(_id=== undefined){
              return res.status(404).json({message:"Authentification required"})
            }
    
            const isTitleExist = await Recette.exists({ title: req.body.title.toUpperCase() });

            if (isTitleExist) {
              return res.status(401).json({ message: "This recette already exists" });
            }
    
            const newRecette= await Recette.create({
                title:req.body.title.toUpperCase(),
                user:_id,
                description:req.body.description,
                category:req.body.category
            })   
            return res.status(201).json({message:"Recette created" , newRecette})
    
        } catch (error) {
            return res.status(500).json({message:error.message})
        }
    },
 allRecettes :async(req,res)=>{
    const{_id}  = req.user
    try {
        const recettes = await Recette.find({user:_id}).populate("user category")
        return res.status(201).json(recettes)
    } catch (error) {
       return res.status(500).json({message:error.message}) 
    }
 }
    
} 
module.exports = recetteCtrl