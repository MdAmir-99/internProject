const mongoose = require("mongoose");
// <-----------------For String Validation------------------>
const validate = (value) => {
  if (
    typeof value === null ||
    typeof value === "undefined" ||
    typeof value === "number"
  )
    return false;
  if (typeof value === "string" && value.trim().length === 0) return false;
  return true;
};

const validateForNumber = (value) => {
  if (typeof value === null || typeof value === "undefined") return false;
  if(typeof value === "string") return false;
  return true;
};

// <---------For Request Body Validation -------------->
const isValidRequestBody = (value) => {
  return Object.keys(value).length > 0;
};

// <-----------For Object Id Validation----------->
const isValidObjectId = (Id) => {
  return mongoose.Types.ObjectId.isValid(Id);
};

// <-------------------Regex------------------->


const clgName = (value) => {
  const collageNameRegex = /^[a-zA-Z][a-zA-Z]{1,7}$/;
  if (!collageNameRegex.test(value.trim())) return false;
  return true;
};

const clgFullName = (value) => {
  const fullNameRegex = /^[a-zA-Z][a-zA-Z,& ]{7,}$/;
  if (!fullNameRegex.test(value.trim())) return false;
  return true;
};

const clgLogoLink = (value) => {
  const urlRegex =
    /(http[s]*:\/\/)([a-z\-_0-9\/.]+)\.([a-z.]{2,3})\/([a-z0-9\-_\/._~:?#\[\]@!$&'()*+,;=%]*)([A-Za-z0-9]+\.)(jpg|jpeg|png)/gm;
  if (!urlRegex.test(value.trim())) return false;
  return true;
};

// <-------------------Regex Validation for intern------------------>

const internName = (value) => {
  const nameRegex = /^[A-Za-z\s]{1,}[\.]{0,1}[A-Za-z\s]{0,}$/;
  if (!nameRegex.test(value.trim())) return false;
  return true;
};

const internMobile = (value) => {
  const mobileRegex = /^[6-9][0-9]{9}$/;
  if (!mobileRegex.test(value)) return false;
  return true;
};

const internEmail = (value) => {
const emailRegex = /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi;
  if (!emailRegex.test(value.trim())) return false;
  return true;
};

module.exports = {
  validate,
  validateForNumber,
  isValidObjectId,
  isValidRequestBody,
  clgName,
  clgFullName,
  clgLogoLink,
  internName,
  internMobile,
  internEmail
};
