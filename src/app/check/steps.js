const ninoController = require("./controllers/national-insurance-number");

module.exports = {
  "/": {
    resetJourney: true,
    entryPoint: true,
    skip: true,
    next: "national-insurance-number",
  },
  "/national-insurance-number": {
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
        next: "national-insurance-number",
      },
      "/oauth2/callback",
    ],
  },
};
