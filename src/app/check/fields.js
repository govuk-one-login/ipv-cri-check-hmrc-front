const { isValidNino } = require("../../lib/validator");

module.exports = {
  nationalInsuranceNumber: {
    type: "text",
    label: {
      classes: [],
    },
    validate: [
      {
        type: "required",
      },
      {
        type: "nino",
        fn: isValidNino,
      },
    ],
  },
  retryNationalInsuranceRadio: {
    type: "radios",
    items: ["retryNationalInsurance", "findAnotherWay"],
    validate: ["required"],
  },
  abandonRadio: {
    type: "radios",
    items: ["abandon", "retryNationalInsurance"],
    validate: ["required"],
  },
};
