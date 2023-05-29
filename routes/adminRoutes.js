const express = require('express');
const {register , login, getAllAdmins} = require('../controllers/adminRoutesController')

const router = express.Router()
router.post('/register',register)
router.post('/login',login)
router.post('/all-admin',getAllAdmins)
module.exports  = router;