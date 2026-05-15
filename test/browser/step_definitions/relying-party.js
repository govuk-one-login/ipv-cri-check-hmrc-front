const { Given, When, Then } = require("@cucumber/cucumber");

const { RelyingPartyPage } = require("../pages");
const assert = require("node:assert");

Given(
  "that {string} user is going through the system",
  async function (userName) {
    const user = this.allUsers[userName];
    const { sharedClaims } = user;
    const rpPage = new RelyingPartyPage(this.page, this.TESTING_CLIENT_ID);
    await rpPage.goto(sharedClaims);
  }
);

Given("they have been redirected as a success", function () {
  const rpPage = new RelyingPartyPage(this.page);
  assert.strictEqual(rpPage.isRelyingPartyServer(), true);
  assert.strictEqual(rpPage.hasSuccessQueryParams(), true);
});

Then(
  "they should be redirected as an error with a description {string}",
  function (err) {
    const rpPage = new RelyingPartyPage(this.page);

    assert.strictEqual(rpPage.isRelyingPartyServer(), true);
    assert.strictEqual(rpPage.hasErrorQueryParams(err), true);
  }
);

Then(/^they should be redirected as a success$/, function () {
  const rpPage = new RelyingPartyPage(this.page);
  assert.strictEqual(rpPage.isRelyingPartyServer(), true);
  assert.strictEqual(rpPage.hasSuccessQueryParams(), true);
});

Then(/^the error should be (.*)$/, function (error_code) {
  const rpPage = new RelyingPartyPage(this.page);

  assert.strictEqual(rpPage.isRelyingPartyServer(), true);
  assert.strictEqual(rpPage.isErrorCode(error_code), true);
});

When(/^they return to a previous page$/, async function () {
  const rpPage = new RelyingPartyPage(this.page);

  await rpPage.page.goBack();
});
