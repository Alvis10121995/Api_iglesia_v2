
// routes.js
const express = require('express');
const router = express.Router();
const controller = require('../controllers/controllers');

router.get('/youtubev2', controller.youtube);
 
module.exports = router;

