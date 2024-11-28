const { setWorldConstructor } = require("@cucumber/cucumber");

require("playwright");

const users = {
  "Happy Harriet": {
    rowNumber: 197,
  },
  "Error Eric": {
    rowNumber: 197,
  },
  "Multiple Names": {
    rowNumber: 202,
  },
};

class CustomWorld {
  constructor() {
    this.allUsers = users;
  }
}

setWorldConstructor(CustomWorld);
