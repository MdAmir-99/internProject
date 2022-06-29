const mongoose = require('mongoose');
const collegeModel = require('../model/collegeModel');
const internModel = require('../model/internModel');

// <-----------------For String Validation------------------>
const validate = (value) =>{

    if(typeof value === null || typeof value === 'undefined' ) return false
    if(typeof value === 'string' && value.trim().length === 0) return false
    return true
}

// <-----------For Object Id Validation----------->
const isValidObjectId = (Id) =>{
    return mongoose.Types.ObjectId.isValid(Id)
}

// <-------------------Regex------------------->
const nameRegex = /^[A-Za-z\s]{1,}[\.]{0,1}[A-Za-z\s]{0,}$/

const mobileRegex = /^[6-9][0-9]{9}$/

const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/



// <---------For Request Body Validation -------------->
const isValidRequestBody = (value) => {

    return Object.keys(value).length > 0;
}



const createIntern = async (req, res) =>{

    try{

        const data = req.body;
        const {name, email, mobile, collegeId, isDeleted} = data;

        if(!isValidRequestBody(data)) return res.status(400).send({status : false, message : "Please Filled the Data !!"});

        // <----------Name Validation with regex and check empty || undefined name also------------>
        if(!validate(name)) return res.status(400).send({status : false, message : "Name is Required !!"})
        if(!nameRegex.test(name.trim())) return res.status(400).send({status : false, message : "Please Enter Name in Valid Format !!"});

        // <----------Email Validation with regex and check empty || undefined name also------------>
        if(!validate(email)) return res.status(400).send({status : false, message : "Email is Required !!"});
        if(!emailRegex.test(email.trim())) return res.status(400).send({status : false, message : "Invalid Email !!"});

        // <-------------Check Email is exist in DB or not--------------->
        const isEmailExist = await internModel.findOne({email});
        if(isEmailExist != null) return res.status(400).send({status : false, message : `${email} is already exist !!`})


        // <----------Mobile Validation with regex and check empty || undefined name also------------>
        if(!validate(mobile)) return res.status(400).send({status : false, message : "Mobile Number is Required !!"})
        if(!mobileRegex.test(mobile.trim())) return res.status(400).send({status : false, message :`${mobile} is Invalid !!`});

        // <-------------Check Mobile is exist in DB or not--------------->

        const isMobileExist = await internModel.findOne({mobile});
        if(isMobileExist != null) return res.status(400).send({status : false, message :`This ${mobile} Number is already Exist !!`});

        // <-------------Check collegeId Valid or not-------------->
        if(!validate(collegeId)) return res.status(400).send({status:false, message : "College id is Requird !!"})
        if(!isValidObjectId(collegeId)) return res.status(400).send({status : false, message : `CollegeId '${collegeId}' is Invalid !!`})

        // <-----------Inserted the data in an Object and Craete the Document------------->
        const internObj = {name, email, mobile, collegeId, isDeleted : isDeleted ? true : false}; 

        const internData = await internModel.create(internObj);

        return res.status(201).send({status : true, data : internData});

        
    }
    catch(err)
    {
        return res.status(500).send({status : false, message : err.message});
    }
}

module.exports = {createIntern}