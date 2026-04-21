const { Then, When, Given } = require("@cucumber/cucumber");
const { AbandonPage, RelyingPartyPage } = require("../pages");
const assert = require("node:assert");

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
  assert.strictEqual(abandonPage.isCurrentPage(), true);
});

Then("they should see abandon validation messages", function () {
  const abandonPage = new AbandonPage(this.page);
  assert.strictEqual(abandonPage.isCurrentPage(), true);
  assert.ok(abandonPage.hasErrorSummary());
});

Then("they should be redirected as access denied", function () {
  const rpPage = new RelyingPartyPage(this.page);

  assert.strictEqual(rpPage.isRelyingPartyServer(), true);
  const { searchParams } = new URL(rpPage.page.url());
  assert.strictEqual(searchParams.get("error"), "access_denied");
});

Then("they should be redirected as an error", function () {
  const rpPage = new RelyingPartyPage(this.page);

  assert.strictEqual(rpPage.isRelyingPartyServer(), true);
  const { searchParams } = new URL(rpPage.page.url());
  assert.strictEqual(searchParams.get("error"), "server_error");
});
