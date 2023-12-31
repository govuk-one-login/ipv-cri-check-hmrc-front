const express = require("express");
const steps = require("./steps");
const fields = require("./fields");

const router = express.Router();

router.use(
  require("hmpo-form-wizard")(steps, fields, {
    name: "check-hmrc",
    journeyName: "checkHmrcCRI",
    templatePath: "check",
  })
);

module.exports = router;
