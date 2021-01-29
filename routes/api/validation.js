var _ = require("lodash");
const express = require("express");
const router = express.Router();
const {
  checkKeyExists,
  checkRequiredField,
  checkFieldType,
} = require("../../validation-functions/checks");

const {
  handleValidation,
} = require("../../validation-functions/validateRules");

router.post("/", (req, res) => {
  const bodyLayer = req.body;
  const dataLayer = req.body.data;
  let fieldValue = null;

  if (!checkFieldType(bodyLayer, "body")) {
    res.status(400).send({
      message: `Invalid JSON payload passed.`,
      status: "error",
      data: null,
    });
  }

  if (!checkRequiredField(bodyLayer, "rule")) {
    res.status(400).send({
      message: `rule is required.`,
      status: "error",
      data: null,
    });
  }

  if (!checkRequiredField(bodyLayer, "data")) {
    res.status(400).send({
      message: `data is required.`,
      status: "error",
      data: null,
    });
  }

  if (!checkFieldType(bodyLayer, "rule")) {
    res.status(400).send({
      message: "rule should be an object.",
      status: "error",
      data: null,
    });
  }

  if (!checkFieldType(bodyLayer, "data")) {
    res.status(400).send({
      message: `data field should be a|an JSON object, array, string.`,
      status: "error",
      data: null,
    });
  }

  const fieldLayer = req.body.rule.field;
  let splitLayer = fieldLayer.split(".");

  if (splitLayer.length == 2) {
    const layerNumber = 2;
    if (!checkKeyExists(dataLayer, splitLayer, layerNumber)) {
      res.status(400).send({
        message: `field ${splitLayer.join(".")} is missing from data.`,
        status: "error",
        data: null,
      });
    }
  }

  if (splitLayer.length == 1) {
    const layerNumber = 1;
    if (!checkKeyExists(dataLayer, splitLayer, layerNumber)) {
      res.status(400).send({
        message: `field ${splitLayer.join(".")} is missing from data.`,
        status: "error",
        data: null,
      });
    }
  }

  if (!handleValidation(bodyLayer).validationPassed) {
    res.status(400).send({
      message: `field ${
        handleValidation(bodyLayer).ruleName
      } failed validation.`,
      status: "error",
      data: {
        validation: {
          error: false,
          field: `${handleValidation(bodyLayer).ruleName}`,
          field_value: `${handleValidation(bodyLayer).fieldValue}`,
          condition: `${handleValidation(bodyLayer).condition}`,
          condition_value: `${handleValidation(bodyLayer).conditionValue}`,
        },
      },
    });
  }

  const fieldName = splitLayer.join(".");
  //   const fieldValue = bodyLayer.rule;
  const conditionValue = bodyLayer.rule.condition_value;
  const condition = bodyLayer.rule.condition;
  //   let getSecondLayer = _.get(object, `${key[0]}`);

  // format success vailidation properly for value of field
  res.status(200).send({
    message: `field ${fieldName} successfully validated.`,
    status: "success",
    data: {
      validation: {
        error: false,
        field: `${fieldName}`,
        field_value: "[value of field]",
        condition: `${condition}`,
        condition_value: `${conditionValue}`,
      },
    },
  });
});

module.exports = router;
