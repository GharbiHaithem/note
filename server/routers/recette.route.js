const express = require('express')
const router = express.Router()
const {createRecette,allRecettes, updateRecette} = require('../controllers/recetteCtrl')
const { authMiddleware } = require('../config/authMiddlware')
router.post('/create-recette' , authMiddleware , createRecette)
router.get('/recettes' , authMiddleware , allRecettes)
router.put('/edit/:id' ,authMiddleware , updateRecette)

module.exports = router