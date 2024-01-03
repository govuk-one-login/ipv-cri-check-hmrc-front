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
        fn: ninoController.prototype.doesNotHaveRetryShowing,
        next: "/oauth2/callback",
      },
    ],
  },
};
