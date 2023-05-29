const express = require('express');
const filteredBlogs = require('../controllers/filterRoutesController');
const router = express.Router();

router.post('/',filteredBlogs)

module.exports = router;