module.exports = {
  nationalInsuranceNumber: {
    type: "text",
    validate: [
      {
        type: "required",
      },
      {
        type: "maxlength",
        fn: "maxlength",
        arguments: [30],
      },
    ],
  },
};
