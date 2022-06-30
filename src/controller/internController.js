const mongoose = require("mongoose");
const internModel = require("../model/internModel");
const collegeModel = require("../model/collegeModel");
const validation = require("../validation/validation");

const { validate, validateForNumber,isValidObjectId, internName, internMobile, internEmail } = validation;

const createIntern = async (req, res) => {
  try {
    const data = req.body;
    const { name, email, mobile, collegeId } = data;

    if (!(name && email && mobile && collegeId)) 
    return res.status(400).send({status : false, message: "Please Fill Mandatory Fields in valid Format !!"})
      

    // <----------Name Validation with regex and check empty || undefined name also------------>
    if (!validate(name))
      return res
        .status(400)
        .send({ status: false, message: "Name is Required !!" });
    if (!internName(name))
      return res
        .status(400)
        .send({
          status: false,
          message: `This (${name}) is invalid!!`,
        });

    // <----------Email Validation with regex and check empty || undefined name also------------>
    if (!validate(email))
      return res
        .status(400)
        .send({ status: false, message: "Email is Required !!" });
    if (!internEmail(email))
      return res
        .status(400)
        .send({ status: false, message: `This (${email}) is invalid!!` });

    // <-------------Check Email is exist in DB or not--------------->
    const isEmailExist = await internModel.findOne({ email });
    if (isEmailExist != null)
      return res
        .status(400)
        .send({ status: false, message: `This (${email}) is already exist !!` });

    // <----------Mobile Validation with regex and check empty || undefined name also------------>
    if (!validateForNumber(mobile))
      return res
        .status(400)
        .send({ status: false, message: "Mobile Number is Required !!" });
    if (!internMobile(mobile))
      return res
        .status(400)
        .send({
          status: false,
          message: `This (${mobile}) Mobile Number is Invalid !!`,
        });

    // <-------------Check Mobile is exist in DB or not--------------->

    const isMobileExist = await internModel.findOne({ mobile });
    if (isMobileExist != null)
      return res
        .status(400)
        .send({
          status: false,
          message: `This (${mobile}) Number is already Exist !!`,
        });

    // <-------------Check collegeId Valid or not-------------->
    if (!validate(collegeId))
      return res
        .status(400)
        .send({ status: false, message: "College id is Requird !!" });
    if (!isValidObjectId(collegeId))
      return res
        .status(400)
        .send({
          status: false,
          message: `CollegeId (${collegeId}) is Invalid !!`,
        });
    // <------------Check College is exist in DB or not------------------>
    const college = await collegeModel.findById(collegeId)
    
    if(college == null) return res.status(400).send({status : false, message : `No college Found with this id (${collegeId})`})

    // <-----------Inserted the data in an Object and Craete the Document------------->
    const internObj = {
      name,
      email,
      mobile,
      collegeId
    };

    const internData = await internModel.create(internObj);

    return res.status(201).send({ status: true, data: internData });
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message});
  }
};

module.exports = { createIntern };

