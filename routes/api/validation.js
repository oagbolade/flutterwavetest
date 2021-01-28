const express = require("express");
const router = express.Router();
const {
  checkKeyExists,
  checkRequiredField,
  checkFieldType,
} = require("../../validation-functions/checks");

router.post("/", (req, res) => {
  const bodyLayer = req.body;
  const dataLayer = req.body.data;

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
      message: `rule field should be a JSON Object`,
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
        message: `${splitLayer.join(".")} is required.`,
        status: "error",
        data: null,
      });
    }
  }

  if (splitLayer.length == 1) {
    const layerNumber = 1;
    if (!checkKeyExists(dataLayer, splitLayer, layerNumber)) {
      res.status(400).send({
        message: `${splitLayer.join(".")} is required.`,
        status: "error",
        data: null,
      });
    }
  }

  res.status(200).send({
    success: "true",
    message: "Confirmed",
  });
});

module.exports = router;
