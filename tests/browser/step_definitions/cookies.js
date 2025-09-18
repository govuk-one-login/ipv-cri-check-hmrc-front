const { Then } = require("@cucumber/cucumber");
const { expect } = require("chai");

Then("the {word} cookie has been set", async function (cookieName) {
  const deadline = Date.now() + 5000;
  let cookie;

  while (Date.now() < deadline) {
    const cookies = await this.page.context().cookies([this.page.url()]);
    cookie = cookies.find(
      (expectedCookie) => expectedCookie.name === cookieName
    );
    if (cookie) break;
    await this.page.waitForTimeout(150);
  }

  expect(cookie, `Cookie ${cookieName} not found within 5s`).to.exist;
});
