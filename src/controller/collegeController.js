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
// const isValidObjectId = (Id) =>{
//     return mongoose.Types.ObjectId.isValid(Id)
// }

// <-------------------Url Regex------------------->
const urlRegex = /(http[s]*:\/\/)([a-z\-_0-9\/.]+)\.([a-z.]{2,3})\/([a-z0-9\-_\/._~:?#\[\]@!$&'()*+,;=%]*)([a-z0-9]+\.)(jpg|jpeg|png)/gm
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
    
        if(!isValidRequestBody(data)) 
        {
            return res.status(400).send({status : false, message:"Please Filled the Data !!!"})
        }

        // <---------Name Validation with regex and check empty name also------------->
        if(!validate(name)){
            return res.status(400).send({status: false, message : "Name is Required!!"})
        }
        let validName = nameRegex.test(name.trim());
        if(!validName){
            return res.status(400).send({status : false, message : "Please use only Alphabet fname!!"})
        }

         // <-------------Check College name is exist in DB or not--------------->

         let collegeName = await collegeModel.findOne({name});
         if(collegeName != null)
         {return res.status(400).send({status : false, message : `${collegeName.name} is already exist !!`})
         };
        
        
        // <---------Fullname Validation with regex and check empty name also------------->
        if(!validate(fullName)) 
        {return res.status(400).send({status: false, message : "Fullname is Required!!"})
        };
        let validFullNAme = fullNameRegex.test(fullName.trim());
        if(!validFullNAme) {return res.status(400).send({status : false, message : "Please use only Alphabet !!"})}


        // <---------Url Validation with regex and check empty name also------------->
        if(!validate(logoLink)) {return res.status(400).send({status : false, message : "Image is Required !!"})};
        let validUrl = urlRegex.test(logoLink.trim());
        if(!validUrl) {
            return res.status(400).send({status : false, message:"Please Upload the url in Valid Format !!"})};

        // <============Validation Ends Here==============>

       

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

const getCollegeDetails = async (req, res) => {

    try{
        const data = req.query;
        const {name} = data;
        if(!isValidRequestBody(data)) return res.status(400).send({status : false, message : "Please Fill the data in query !!"})

        if(!validate(name)) return res.status(400).send({status : false, message : "college Name is required !!"});
        if(!nameRegex.test(name.trim())) return res.status(400).send({status : false, message:`College Name '${name}' is invalid !!`})
    
        // <-------check CollegeName is Present in DB or not----------->
        const collegeName = await collegeModel.findOne({name})

        if(collegeName == null) return res.status(400).send({status:false, message:`No College Found with this name '${name}'`});
        
        // <----------Create Object to send in response---------->
        const collegeDetaisObj = {};
        collegeDetaisObj['name'] = collegeName.name;
        collegeDetaisObj['fullName'] = collegeName.fullName;
        collegeDetaisObj['logoLink'] = collegeName.logoLink;
        // console.log(collegeDetaisObj)

        // <----------Find All the Interns of the find CollegeName------------->

        const internDetails = await internModel.find({collegeId : collegeName._id})
        console.log(collegeName._id);
        collegeDetaisObj['interns'] = internDetails;

        return res.status(200).send({status : true, data : collegeDetaisObj})
        
    
    }
    catch(err){
        return res.status(500).send({status : false, message : err.message})
    }
}

module.exports = {createCollege, getCollegeDetails};