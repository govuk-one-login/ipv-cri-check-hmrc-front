const { Then, When } = require("@cucumber/cucumber");
const { NinoPage } = require("../pages");
const { expect } = require("chai");

Then(/^they should see the national insurance number page$/, async function () {
  const ninoPage = new NinoPage(this.page);

  expect(ninoPage.isCurrentPage()).to.be.true;
});

Then("they continue from national insurance number", async function () {
  const ninoPage = new NinoPage(this.page);
  await ninoPage.continue();
});

Then(
  "they should see the {string} validation error page",
  async function (errorType) {
    const ninoPage = new NinoPage(this.page);
    expect(ninoPage.isCurrentPage()).to.be.true;
    expect(ninoPage.hasErrorSummary).to.not.be.false;

    const errorMessage = await ninoPage.hasErrorSummary().innerText();

    if (errorType === "nino") {
      expect(errorMessage).to.include(
        "Enter your National Insurance number in the correct format"
      );
    } else if (errorType === "invalidLetter") {
      expect(errorMessage).to.include(
        "The National Insurance number you entered is not correct, check it and try again"
      );
    } else {
      throw new Error(`Unexpected error type: ${errorType}`);
    }
  }
);

When(/^they enter their national insurance number$/, async function () {
  const ninoPage = new NinoPage(this.page);

  await ninoPage.enterNINO("AA123455D");
});

When(
  "they enter a {string} national insurance number",
  async function (invalidCharacter) {
    const ninoPage = new NinoPage(this.page);

    await ninoPage.enterNINO(invalidCharacter);
  }
);

When(
  "they enter a {string} national insurance number value",
  async function (invalidNino) {
    const ninoPage = new NinoPage(this.page);

    await ninoPage.enterNINO(invalidNino);
  }
);

When(
  "they enter a national insurance number that requires a retry",
  async function () {
    const ninoPage = new NinoPage(this.page);

    await ninoPage.enterNINO("EE123456A");
  }
);

When(
  "they click on the abandon link from enter national insurance page",
  async function () {
    const ninoPage = new NinoPage(this.page);
    await ninoPage.selectAbandon();
  }
);
