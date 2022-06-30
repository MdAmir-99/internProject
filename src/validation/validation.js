const mongoose = require("mongoose");
// <-----------------For String Validation------------------>
const validate = (value) => {
  if (typeof value === null || typeof value === "undefined") return false;
  if (typeof value === "string" && value.trim().length === 0) return false;
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

const isFormat = (value) => {
  const nameRegex = /^[A-Za-z\s]{1,}[\.]{0,1}[A-Za-z\s]{0,}$/;
  if (!nameRegex.test(value.trim())) return false;

  const mobileRegex = /^[6-9][0-9]{9}$/;
  if (!mobileRegex.test(value.trim())) return false;

  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (!emailRegex.test(value.trim())) return false;

  //<----------Regex For College------------------->
  const urlRegex =
    /(http[s]*:\/\/)([a-z\-_0-9\/.]+)\.([a-z.]{2,3})\/([a-z0-9\-_\/._~:?#\[\]@!$&'()*+,;=%]*)([A-Za-z0-9]+\.)(jpg|jpeg|png)/gm;
  if (!urlRegex.test(value.trim())) return false;

  const collageNameRegex = /[A-Za-z]/gm;
  if (!collageNameRegex.test(value.trim())) return false;

  const fullNameRegex = /[A-Za-z,& ]/gm;
  if (!fullNameRegex.test(value.trim())) return false;

  return true;
};

module.exports = { validate, isValidObjectId, isFormat, isValidRequestBody };
