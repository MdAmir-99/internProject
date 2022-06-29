const express = require('express');
const router = express.Router();
const collegeController = require('../controller/collegeController');
const interController = require('../controller/internController');


            //<---------Create College--------------> 
router.post('/functionup/colleges', collegeController.createCollege);

            //<---------Get Details of College----------->
router.get('/functionup/collegeDetails', collegeController.getCollegeDetails)

            //<----------Create Interns----------------->
router.post('/functionup/interns', interController.createIntern);


            //<-------------No Page Found----------------> 
router.all('/*', (req, res) => {return res.status(404).send({status : false, message:"Page Not Found !!"})})




module.exports = router