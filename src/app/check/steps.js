import ninoController from "./controllers/enter-national-insurance-number.js";
import AbandonController from "./controllers/abandon.js";

export default {
  "/": {
    resetJourney: true,
    entryPoint: true,
    skip: true,
    next: "enter-national-insurance-number",
  },
  "/enter-national-insurance-number": {
    controller: ninoController,
    fields: ["nationalInsuranceNumber"],
    next: [
      {
        fn: ninoController.prototype.hasRedirectToRetryShowing,
        next: "could-not-match-national-insurance",
      },
      "/oauth2/callback",
    ],
  },
  "/could-not-match-national-insurance": {
    fields: ["retryNationalInsuranceRadio"],
    next: [
      {
        field: "retryNationalInsuranceRadio",
        value: "retryNationalInsurance",
        next: "enter-national-insurance-number",
      },
      "abandon",
    ],
  },
  "/how-continue-national-insurance": {
    prereqs: ["/"],
    fields: ["abandonRadio"],
    next: [
      {
        field: "abandonRadio",
        value: "retryNationalInsurance",
        next: "enter-national-insurance-number",
      },
      "abandon",
    ],
  },
  "/abandon": {
    skip: true,
    controller: AbandonController,
    next: "/oauth2/callback",
  },
};
