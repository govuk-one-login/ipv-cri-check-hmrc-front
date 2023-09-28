const { Given, Then, When } = require("@cucumber/cucumber");
const { NinoPage } = require("../pages");
const { expect } = require("chai");

Then(/they should see the national insurance number page$/, async function () {
  const ninoPage = new NinoPage(this.page);

  expect(ninoPage.isCurrentPage()).to.be.true;
});

Then("they continue from national insurance number", async function () {
  const ninoPage = new NinoPage(this.page);
  await ninoPage.continue();
});

When(/^they enter their national insurance number$/, async function () {
  const ninoPage = new NinoPage(this.page);

  await ninoPage.enterNINO("AA123455D");
});
