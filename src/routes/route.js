const express = require('express');
const router = express.Router();
const internModel = require('../controller/internController')



// router.get('/test',function(req,res){
// res.send("My first api")
// })




router.post('/functionup/interns',internModel.createIntern)






module.exports = router;