const { Then, When } = require("@cucumber/cucumber");
const {
  CouldNotMatchNationalInsurancePage,
  RelyingPartyPage,
} = require("../pages");
const { expect, assert } = require("chai");

When(
  "they click continue could not match national insurance number",
  async function () {
    const couldNotMatchNationalInsurancePage =
      new CouldNotMatchNationalInsurancePage(this.page);
    await couldNotMatchNationalInsurancePage.continue();
  }
);

When(
  "they choose to retry entering national insurance number",
  async function () {
    const couldNotMatchNationalInsurancePage =
      new CouldNotMatchNationalInsurancePage(this.page);
    await couldNotMatchNationalInsurancePage.selectRetry();
  }
);

When(
  "they choose to not retry entering national insurance number",
  async function () {
    const couldNotMatchNationalInsurancePage =
      new CouldNotMatchNationalInsurancePage(this.page);
    await couldNotMatchNationalInsurancePage.selectReturn();
  }
);

Then("they should be redirected to access_denied", function () {
  const rpPage = new RelyingPartyPage(this.page);
  expect(rpPage.isRelyingPartyServer()).to.be.true;
  const { searchParams } = new URL(rpPage.page.url());
  assert.equal(searchParams.get("error"), "access_denied");
});

Then(
  "they should see could not match national insurance validation messages",
  function () {
    const couldNotMatchNationalInsurancePage =
      new CouldNotMatchNationalInsurancePage(this.page);
    expect(couldNotMatchNationalInsurancePage.isCurrentPage()).to.be.true;

    expect(couldNotMatchNationalInsurancePage.hasErrorSummary).to.not.be.false;
  }
);

Then(
  "they should see the could not match national insurance number page",
  async function () {
    const couldNotMatchNationalInsurancePage =
      new CouldNotMatchNationalInsurancePage(this.page);
    expect(couldNotMatchNationalInsurancePage.isCurrentPage()).to.be.true;
  }
);
