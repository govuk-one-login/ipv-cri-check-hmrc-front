const { setWorldConstructor } = require("@cucumber/cucumber");

require("playwright");

const users = {
  "Happy Harriet": {},
  "Error Eric": {},
  "Multiple Names": {},
};

class CustomWorld {
  constructor() {
    this.allUsers = users;
  }
}

setWorldConstructor(CustomWorld);
