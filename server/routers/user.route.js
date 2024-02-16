const express = require('express')
const router = express.Router()
const {saveOrLoginUser,login,createUser} = require('../controllers/userCtr')
router.post('/save-login' , saveOrLoginUser)
router.post('/saveuser' , createUser)

router.post('/login',login)
module.exports = router