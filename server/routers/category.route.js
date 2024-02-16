const express = require('express')
const router = express.Router()
const {createCat,categories} = require('../controllers/categoryCtrl')
const { authMiddleware } = require('../config/authMiddlware')
router.post('/create-cat' , authMiddleware , createCat)
router.get('/categories' , authMiddleware , categories)

module.exports = router