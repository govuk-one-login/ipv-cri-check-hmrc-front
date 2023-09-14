module.exports = {
  "/": {
    resetJourney: true,
    entryPoint: true,
    skip: true,
    next: "national-insurance-number",
  },
  "/national-insurance-number": {
    fields: ["nationalInsuranceNumber"],
    next: "/oauth2/callback",
  },
};
