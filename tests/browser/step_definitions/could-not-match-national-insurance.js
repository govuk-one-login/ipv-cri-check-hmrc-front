const { Then, When } = require("@cucumber/cucumber");
const {
  CouldNotMatchNationalInsurancePage,
  RelyingPartyPage,
} = require("../pages");
const assert = require("node:assert");

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
  assert.strictEqual(rpPage.isRelyingPartyServer(), true);
  const { searchParams } = new URL(rpPage.page.url());
  assert.equal(searchParams.get("error"), "access_denied");
});

Then(
  "they should see could not match national insurance validation messages",
  function () {
    const couldNotMatchNationalInsurancePage =
      new CouldNotMatchNationalInsurancePage(this.page);
    assert.strictEqual(
      couldNotMatchNationalInsurancePage.isCurrentPage(),
      true
    );

    assert.ok(couldNotMatchNationalInsurancePage.hasErrorSummary());
  }
);

Then(
  "they should see the could not match national insurance number page",
  async function () {
    const couldNotMatchNationalInsurancePage =
      new CouldNotMatchNationalInsurancePage(this.page);
    assert.strictEqual(
      couldNotMatchNationalInsurancePage.isCurrentPage(),
      true
    );
  }
);
