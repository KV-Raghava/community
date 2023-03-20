//This index.js is entry point for routes,main index uses this index
const express = require('express');
const homeController = require('../controllers/home_controller.js');
const router = express.Router();
//console.log('routes working');
router.get('/',homeController.home);
router.use('/users',require('./users'));
router.use('/posts',require('./posts'));
router.use('/comments',require('./comments'));
module.exports = router;