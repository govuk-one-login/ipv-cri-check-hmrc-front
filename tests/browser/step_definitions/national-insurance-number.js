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

Then(/^they should see the validation error page$/, async function () {
  const ninoPage = new NinoPage(this.page);
  expect(ninoPage.isCurrentPage()).to.be.true;

  expect(ninoPage.hasErrorSummary).to.not.be.false;
});

When(/^they enter their national insurance number$/, async function () {
  const ninoPage = new NinoPage(this.page);

  await ninoPage.enterNINO("AA123455D");
});

When(/^they enter a bad national insurance number$/, async function () {
  const ninoPage = new NinoPage(this.page);

  await ninoPage.enterNINO("QQ123456Q");
});

When(
  "they enter a national insurance number that requires a retry",
  async function () {
    const ninoPage = new NinoPage(this.page);

    await ninoPage.enterNINO("RT123456A");
  }
);
