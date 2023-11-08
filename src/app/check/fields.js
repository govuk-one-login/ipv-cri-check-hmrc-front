const { isValidNino } = require("../../lib/validator");

module.exports = {
  nationalInsuranceNumber: {
    type: "text",
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
};
