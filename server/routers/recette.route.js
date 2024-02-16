const express = require('express')
const router = express.Router()
const {createRecette,allRecettes} = require('../controllers/recetteCtrl')
const { authMiddleware } = require('../config/authMiddlware')
router.post('/create-recette' , authMiddleware , createRecette)
router.get('/recettes' , authMiddleware , allRecettes)


module.exports = router