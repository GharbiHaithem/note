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
                category:req.body.category,
                images:req.body.images
            })   
            return res.status(201).json({message:"Recette created" , newRecette})
    
        } catch (error) {
            return res.status(500).json({message:error.message})
        }
    },

    allRecettes: async (req, res) => {
        const { _id } = req.user;
    
        try {
            // Utilisez countDocuments pour obtenir le nombre total d'enregistrements
            const totalRecords = await Recette.countDocuments({ user: _id });
         
            // Utilisez find pour obtenir les recettes avec une limite
            const recettes = await Recette.find({ user: _id }).populate("user category");
  
            // Retournez les données et le nombre total d'enregistrements
            return res.status(201).json({ recettes, totalRecords });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },
    updateRecette:async(req,res)=>{
        const { id } = req.params
       
       
        try{
       
       
          console.log(id,req.body.description)
          const updatedRecette = await Recette.findByIdAndUpdate(id,{description:req.body.description,title:req.body.title},{new:true})
          console.log(updatedRecette)
        return res.json({messaqe:"recette updated", updatedRecette})
        
       
        }catch(err){
         res.json({message:err.message})
        }
    },
    
    
} 
module.exports = recetteCtrl