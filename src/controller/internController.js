const internModel = require('../model/internModel')
const collegeModel = require('../model/collegeModel')
const mongoose = require('mongoose')

const createIntern = async function (req, res) {

  try {




    let name = req.body.name
    if(!name){return res.status(400).send({status:false,msg:"Name is mandatory"})}
    let isValidname = /[a-zA-Z][a-zA-Z ]+[a-zA-Z]$/
    if (!isValidname.test(name)) { return res.status(400).send({ status: false, msg: "Enter Valid name" }) }



    let email = req.body.email

    if (!email) { return res.status(400).send({ status: false, msg: "Email is mandatory" }) }
    let validEmail = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/
    if (!validEmail.test(email)) { return res.status(400).send({ status: false, msg: "Email is invalid" }) }
    let ifExist = await internModel.find({ email: email })
    if (ifExist.length > 0) { return res.status(400).send({ status: false, msg: "Email already exists" }) }






    let mobile = req.body.mobile
    if (!mobile) { return res.status({ status: false, msg: "Mobile number is mandatory" }) }
    if (typeof (mobile) != "number") { return res.status(400).send({ status: false, msg: "Invalid mobile number" }) }
    if (mobile.toString().length != 10) { return res.status(400).send("Enter valid number") }
    let alreadyExist = await internModel.find({ mobile: mobile })
    if (alreadyExist.length > 0) { return res.status(400).send({ status: false, msg: "Number already exist,use different one" }) }





    let collegeId = req.body.collegeId
    if (!mongoose.isValidObjectId(collegeId)) { return res.status(400).send({ status: false, msg: "Enter valid collegeId" }) }
    let isAvailable = await collegeModel.find({ collegeId: collegeId })
    if (isAvailable.length == 0) { return res.status(400).send({ status: false, msg: "No college with this Id exist" }) }






    let isDeleted = req.body.isDeleted
    if (typeof (isDeleted) != "boolean") { return res.status(400).send({ status: false, msg: "Enter boolean value for isDeleted" }) }
    let createNow = await (await internModel.create({ name, email, mobile, collegeId, isDeleted }))
    return res.status(201).send({ status: true, data: createNow })
  }

  catch (err) {
    return res.status(500).send({ msg: "error", error: err.message })
  }


}

module.exports.createIntern = createIntern