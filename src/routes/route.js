const express = require('express');
const router = express.Router();
const collegeController = require('../controller/collegeController');
const interController = require('../controller/internController');


router.post('/functionup/colleges', collegeController.createCollege);

router.post('/functionup/interns', interController.createIntern);

router.get('/functionup/collegeDetails', collegeController.getCollegeDetails)

router.all('/*', (req, res) => {return res.status(404).send({status : false, message:"Page Not Found !!"})})




module.exports = router