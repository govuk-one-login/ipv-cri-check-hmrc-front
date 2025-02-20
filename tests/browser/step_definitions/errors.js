const { When, Then, Given } = require("@cucumber/cucumber");
const { expect } = require("chai");
const { ErrorPage } = require("../pages");

Given("they have started the journey", function () {});

Given("that a user directly accesses the base url", async function () {
  this.errorPage = new ErrorPage(this.page);
  await this.errorPage.directlyAccessBaseUrl();
});

When("there is an immediate error", function () {});

Then("they should see the unrecoverable error page", async function () {
  this.errorPage = new ErrorPage(this.page);

  const errorTitle = await this.errorPage.getErrorTitle();

  expect(errorTitle).to.equal(this.errorPage.getSomethingWentWrongMessage());
});
