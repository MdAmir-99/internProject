const mongoose = require("mongoose");
const collegeModel = require("../model/collegeModel");
const internModel = require("../model/internModel");
const checkValidation = require("../validation/validation");

const {validate,isValidRequestBody, clgName, clgFullName, clgLogoLink} = checkValidation;

const createCollege = async (req, res) => {
  try {
    let data = req.body;
    const {fullName, logoLink } = data;
    let name = data.name;

    if(!(name && fullName && logoLink)) 
    return res.status(400).send({status:false, message:"Please Fill Mandatory Fields in valid Format !!"})

    // <---------Name Validation with regex and check empty name also------------->
    if (!validate(name)) {
      return res
        .status(400)
        .send({ status: false, message: `College Name (${name}) is in invalid format !!` });
    }
    name = data.name.toLowerCase();

    if (!clgName(name)) {
      return res
        .status(400)
        .send({ status: false, message: `College Name (${name}) is in invalid format !!` });
    }

    // <-------------Check College name is exist in DB or not--------------->

    let collegeName = await collegeModel.findOne({ name });
    if (collegeName != null) {
      return res
        .status(400)
        .send({
          status: false,
          message: `${collegeName.name} is already exist !!`,
        });
    }

    // <---------Fullname Validation with regex and check empty name also------------->
    if (!validate(fullName)) {
      return res
        .status(400)
        .send({ status: false, message: `College FullName (${fullName}) is in invalid format !!` });
    }
    // let validFullNAme = fullNameRegex.test(fullName.trim());
    if (!clgFullName(fullName)) {
      return res
        .status(400)
        .send({ status: false, message: `College FullName (${fullName}) is in invalid format !!` });
    }

    // <---------Url Validation with regex and check empty name also------------->
    if (!validate(logoLink)) {
      return res
        .status(400)
        .send({ status: false, message: `Image Url (${logoLink}) is in invalid format !!` });
    }
    if (!clgLogoLink(logoLink)) {
      return res
        .status(400)
        .send({
          status: false,
          message: `This Url '${logoLink}' is Invalid !!`,
        });
    }

    // <============Validation Ends Here==============>

    //<------------Object Destructring and store value of isDeleted AQT input------->
    const collegeDetails = {
      name,
      fullName,
      logoLink,
    };

    const collegeCreate = await collegeModel.create(collegeDetails);
    return res.status(201).send({ status: true, data: collegeCreate });
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};

const getCollegeDetails = async (req, res) => {
  try {
    const data = req.query;
    let  name  = data.name;
    if (!isValidRequestBody(data))
      return res
        .status(400)
        .send({ status: false, message: "Please Fill the data in query !!" });

    if (!validate(name))
      return res
        .status(400)
        .send({ status: false, message: `College Name (${name}) is in invalid format !!` });

        name = name.toLowerCase()

    if (!clgName(name))
      return res
        .status(400)
        .send({
          status: false,
          message: `College Name '${name}' is in invalid !!`,
        });

    // <-------check CollegeName is Present in DB or not----------->
    const collegeName = await collegeModel.findOne({ name });

    if (collegeName == null)
      return res
        .status(400)
        .send({
          status: false,
          message: `No College Found with this name '${name}'`,
        });

    // <----------Create Object to send in response---------->
    const collegeDetaisObj = {};
    collegeDetaisObj["name"] = collegeName.name;
    collegeDetaisObj["fullName"] = collegeName.fullName;
    collegeDetaisObj["logoLink"] = collegeName.logoLink;

    // <----------Find All the Interns of the find CollegeName------------->
    const internDetails = await internModel.find({collegeId: collegeName._id});
    if(internDetails.length == 0) return res.status(400).send({status : false, message:`No Intern Found With This College (${name})`});
    collegeDetaisObj["interns"] = internDetails;

    return res.status(200).send({ status: true, data: collegeDetaisObj });
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};

module.exports = { createCollege, getCollegeDetails };


