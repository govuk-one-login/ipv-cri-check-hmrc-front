const { setWorldConstructor } = require("@cucumber/cucumber");

require("playwright");

const users = {
  "Happy Harriet": {},
  "Error Eric": {},
  "Multiple Names": {
    sharedClaims: {
      name: [
        {
          nameParts: [
            {
              type: "GivenName",
              value: "PETER",
            },
            {
              type: "GivenName",
              value: "SYED  HABIB",
            },
            {
              type: "FamilyName",
              value: "MARTIN-JOY",
            },
          ],
        },
      ],
      birthDate: [
        {
          value: "1965-07-08",
        },
      ],
    },
  },
};

class CustomWorld {
  constructor() {
    this.allUsers = users;
  }
}

setWorldConstructor(CustomWorld);
