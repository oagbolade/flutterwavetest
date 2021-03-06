var _ = require("lodash");
const { includes } = require("lodash");

const checkKeyExists = (object, key, layerNumber) => {
  if (layerNumber === 2) {
    let firstKeyExists = object.hasOwnProperty(key[0]);
    let getSecondLayer = _.get(object, `${key[0]}`);
    let secondKeyExists = getSecondLayer.hasOwnProperty(key[1]);

    return !firstKeyExists || !secondKeyExists ? false : true;
  }

  if (layerNumber === 1) {
    let firstKeyExists = object.hasOwnProperty(key[0]);

    return !firstKeyExists ? false : true;
  }
};

const checkRequiredField = (object, fieldName) => {
  if (fieldName.includes("rule.")) {
    const getSecondLayer = object.rule;
    const splitFieldName = fieldName.split(".");
    const KeyExists = getSecondLayer.hasOwnProperty(`${splitFieldName[1]}`);
    return !KeyExists ? false : true;
  }

  let KeyExists = object.hasOwnProperty(`${fieldName}`);
  return !KeyExists ? false : true;
};

const checkFieldType = (object, fieldName) => {
  if (fieldName == "body") {
    let isObject = isLiteralObject(object);
    return !isObject ? false : true;
  }

  if (fieldName == "rule") {
    let isObject = isLiteralObject(object[fieldName]);
    return !isObject ? false : true;
  }

  if (fieldName == "data") {
    let isObject = isLiteralObject(object[fieldName]);
    let checkArray = isArray(object[fieldName]);
    let checkString = isString(object[fieldName]);
    return isObject || checkArray || checkString ? true : false;
  }
};

const isLiteralObject = function (a) {
  return !!a && a.constructor === Object;
};

const isString = function (str) {
  return typeof str == "string" || str instanceof String;
};

const isArray = function (a) {
  return !!a && a.constructor === Array;
};

module.exports = {
  checkKeyExists,
  checkRequiredField,
  checkFieldType,
};
