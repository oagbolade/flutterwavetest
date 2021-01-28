var _ = require("lodash");

const handleValidation = function (bodyLayer) {
  let validationPassed = false;
  const condition = bodyLayer.rule.condition;
  const conditionValue = bodyLayer.rule.condition_value;
  const fieldName = bodyLayer.rule.field;
  let fieldValue = bodyLayer.data[fieldName];

  let splitLayer = fieldName.split(".");

  if (splitLayer.length == 2) {
    const firstlevel = splitLayer[0];
    const secondlevel = splitLayer[1];
    fieldValue = _.get(bodyLayer, `data.${firstlevel}.${secondlevel}`);
  }

  switch (condition) {
    case "eq":
      if (conditionValue == fieldValue) {
        validationPassed = true;
      }
      break;
    case "neq":
      if (conditionValue != fieldValue) {
        validationPassed = true;
      }
      break;
    case "gt":
      if (fieldValue > conditionValue) {
        validationPassed = true;
      }
      break;
    case "gte":
      if (fieldValue >= conditionValue) {
        validationPassed = true;
      }
      break;
    case "contains":
      if (fieldValue.toString().includes(conditionValue.toString())) {
        validationPassed = true;
      }
      break;
    default:
      validationPassed = false;
      break;
  }

  return {
    validationPassed,
    ruleName: splitLayer.join("."),
    condition,
    conditionValue,
    fieldValue,
  };
};

module.exports = {
  handleValidation,
};
