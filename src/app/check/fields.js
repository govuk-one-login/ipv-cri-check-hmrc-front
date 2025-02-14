const { isValidNino, invalidCharacters } = require("../../lib/validator");

module.exports = {
  nationalInsuranceNumber: {
    type: "text",
    label: {
      classes: [],
    },
    classes: "govuk-input--extra-letter-spacing govuk-!-width-one-half",
    validate: [
      {
        type: "required",
      },
      {
        type: "nino",
        fn: (value) => {
          return isValidNino(value);
        },
      },
      {
        type: "invalidLetter",
        fn: (value) => {
          return invalidCharacters(value);
        },
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
