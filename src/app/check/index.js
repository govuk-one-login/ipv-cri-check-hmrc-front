const express = require("express");
const steps = require("./steps");
const fields = require("./fields");

const router = express.Router();

const {
  sessionCheckMiddleware,
} = require("./middleware/session-check-middleware");

router.use(sessionCheckMiddleware);

router.use(
  require("hmpo-form-wizard")(steps, fields, {
    name: "check-hmrc",
    journeyName: "checkHmrcCRI",
    templatePath: "check",
  })
);

module.exports = router;
