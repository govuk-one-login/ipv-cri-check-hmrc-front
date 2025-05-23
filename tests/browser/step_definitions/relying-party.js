const { Given, When, Then } = require("@cucumber/cucumber");

const { RelyingPartyPage } = require("../pages");
const { expect } = require("chai");

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
  expect(rpPage.isRelyingPartyServer()).to.be.true;
  expect(rpPage.hasSuccessQueryParams()).to.be.true;
});

Then(
  "they should be redirected as an error with a description {string}",
  function (err) {
    const rpPage = new RelyingPartyPage(this.page);

    expect(rpPage.isRelyingPartyServer()).to.be.true;

    expect(rpPage.hasErrorQueryParams(err)).to.be.true;
  }
);

Then(/^they should be redirected as a success$/, function () {
  const rpPage = new RelyingPartyPage(this.page);

  expect(rpPage.isRelyingPartyServer()).to.be.true;

  expect(rpPage.hasSuccessQueryParams()).to.be.true;
});

Then(/^the error should be (.*)$/, function (error_code) {
  const rpPage = new RelyingPartyPage(this.page);

  expect(rpPage.isRelyingPartyServer()).to.be.true;

  expect(rpPage.isErrorCode(error_code)).to.be.true;
});

When(/^they return to a previous page$/, async function () {
  const rpPage = new RelyingPartyPage(this.page);

  await rpPage.page.goBack();
});
