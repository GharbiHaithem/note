const Recette = require('../models/recette')
const Category = require('../models/Category')

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
        const { searchQuery } = req.query;
    
        try {
            // Utilisez countDocuments pour obtenir le nombre total d'enregistrements
            const totalRecords = await Recette.countDocuments({ user: _id });
            let catId
            if (searchQuery) {
                const regex = new RegExp(searchQuery, 'i'); // 'i' pour une correspondance insensible à la casse
                const recettescat = await Category.find({
                    $and: [
                        { titleCategory: regex ,
                            user:_id
                        },
                       
                      
                    ],
                })
                if(recettescat && recettescat.length >0 ){
                     catId = recettescat[0]._id
                    console.log({categ:catId})
                }
                
                const recettes = await Recette.find({
                    $and: [
                        { $or: [
                            { title: regex },
                            { category: catId }
                        ] },
                        { user: _id }
                    ]
                });
                
                console.log({recettes})
                return res.json({recettes});
            } else {
                const recettes = await Recette.find({ user: _id }).populate("user category");
                return res.status(201).json({ recettes, totalRecords });
            }
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
function escapeRegExp(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
module.exports = recetteCtrl