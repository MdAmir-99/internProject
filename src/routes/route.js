const express = require('express');
const router = express.Router();
const collegeController = require('../controller/collegeController');
// const interController = require('../controller/interController');


router.post('/functionup/colleges', collegeController.createCollege);






module.exports = router