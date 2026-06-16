import express from "express";
import wizard from "hmpo-form-wizard";
import steps from "./steps.js";
import fields from "./fields.js";
import { sessionCheckMiddleware } from "./middleware/session-check-middleware.js";

const router = express.Router();

router.use(sessionCheckMiddleware);

router.use(
  wizard(steps, fields, {
    name: "check-hmrc",
    journeyName: "checkHmrcCRI",
    templatePath: "check",
  })
);

export default router;
