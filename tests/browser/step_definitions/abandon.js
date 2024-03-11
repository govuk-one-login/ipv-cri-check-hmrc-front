const { Then, When, Given } = require("@cucumber/cucumber");
const { AbandonPage, RelyingPartyPage } = require("../pages");
const { expect, assert } = require("chai");

Given("they choose to abandon", async function () {
  const abandonPage = new AbandonPage(this.page);
  await abandonPage.selectAbandon();
});

Given("they choose to return to national insurance number", async function () {
  const abandonPage = new AbandonPage(this.page);
  await abandonPage.selectReturn();
});

When("they click continue from abandon", async function () {
  const abandonPage = new AbandonPage(this.page);
  await abandonPage.continue();
});

Then("they should see the abandon page", function () {
  const abandonPage = new AbandonPage(this.page);
  expect(abandonPage.isCurrentPage()).to.be.true;
});

Then("they should see abandon validation messages", function () {
  const abandonPage = new AbandonPage(this.page);
  expect(abandonPage.isCurrentPage()).to.be.true;

  expect(abandonPage.hasErrorSummary).to.not.be.false;
});

Then("they should be redirected as access denied", function () {
  const rpPage = new RelyingPartyPage(this.page);

  expect(rpPage.isRelyingPartyServer()).to.be.true;
  const { searchParams } = new URL(rpPage.page.url());
  assert.equal(searchParams.get("error"), "access_denied");
});
