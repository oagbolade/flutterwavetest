const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).send({
    message: "My Rule-Validation API",
    status: "success",
    data: {
      name: "Agbolade Oladayo David",
      github: "https://github.com/oagbolade",
      email: "dayoagbolade@gmail.com",
      mobile: "08147471248",
      twitter: "@dayo_daved",
    },
  });
});

module.exports = router;
