const mongoose = require('mongoose');
const collegeModel = require('../model/collegeModel');


// <-----------------For String Validation------------------>
const validate = (value) =>{

    if(typeof value === null || typeof value === 'undefined' ) return false
    if(typeof value === 'string' && value.trim().length === 0) return false
    return true
}

// <-----------For Object Id Validation----------->
// const isValidObjectId = (Id) =>{
//     return mongoose.Types.ObjectId.isValid(Id)
// }

// <-------------------Url Regex------------------->
const urlRegex = /(((ftp|http|https):\/\/)|(\/)|(..\/))(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
const nameRegex = /[A-Za-z]/gm
const fullNameRegex = /[A-Za-z,& ]/gm;


// <---------For Request Body Validation -------------->
const isValidRequestBody = (value) => {

    return Object.keys(value).length > 0;
}


const createCollege = async (req, res) => {

    try{
        let data = req.body;
        const { name, fullName, logoLink, isDeleted } = data;
    
        if(!isValidRequestBody(data)) return res.status(400).send({status : false, message:"Please Filled the Data !!!"})

        // <---------Name Validation with regex and check empty name also------------->
        if(!validate(name)) return res.status(400).send({status: false, message : "Name is Required!!"})
        let validName = nameRegex.test(name.trim());
        if(!validName) return res.status(400).send({status : false, message : "Please use only Alphabet fname!!"})
        
        
        // <---------Fullname Validation with regex and check empty name also------------->
        if(!validate(fullName)) return res.status(400).send({status: false, message : "Fullname is Required!!"})
        let validFullNAme = fullNameRegex.test(fullName.trim());
        if(!validFullNAme) return res.status(400).send({status : false, message : "Please use only Alphabet !!"})


        // <---------Url Validation with regex and check empty name also------------->
        if(!validate(logoLink)) return res.status(400).send({status : false, message : "Image is Required !!"});
        let validUrl = urlRegex.test(logoLink.trim());
        if(!validUrl) return res.status(400).send({status : false, message:"Please Upload the url in Valid Format !!"});

        // <============Validation Ends Here==============>

        // <-------------Check College name is exist in DB or not--------------->

        let collegeName = await collegeModel.findOne({name});
        if(collegeName != null) return res.status(400).send({status : false, message : `${collegeName.name} is already exist !!`})

        //<------------Object Destructring and store value of isDeleted AQT input------->
        const collegeDetails = { name, fullName, logoLink, isDeleted : isDeleted ? true : false};

        const collegeCreate = await collegeModel.create(collegeDetails)
        return res.status(201).send({status : true, data : collegeCreate});

    }
    catch(err)
    {
        return res.status(500).send({status : false, message : err.message})
    }

}

module.exports = {createCollege};