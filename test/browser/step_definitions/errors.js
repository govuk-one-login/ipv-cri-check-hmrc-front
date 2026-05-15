const { When, Then, Given } = require("@cucumber/cucumber");
const assert = require("node:assert");
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
  assert.strictEqual(errorTitle, this.errorPage.getSomethingWentWrongMessage());
});

When("they go to an unknown page", async function () {
  const errorPage = new ErrorPage(this.page);
  await errorPage.goToPage("not-going-to-be-found");
});

Then("they should see the Page not found error page", async function () {
  const errorPage = new ErrorPage(this.page);
  const errorPageHeader = await errorPage.getPageHeader();
  assert.ok(errorPageHeader.includes("Page not found"));
});
