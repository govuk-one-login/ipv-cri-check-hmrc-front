module.exports = class PlaywrightDevPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.path = "/could-not-match-national-insurance";
  }

  async continue() {
    await this.page.click("#continue");
  }

  isCurrentPage() {
    const { pathname } = new URL(this.page.url());

    return pathname === this.path;
  }

  hasErrorSummary() {
    return this.page.locator(".govuk-error-summary");
  }

  async selectRetry() {
    await this.page
      .locator(`input[type="radio"][value="retryNationalInsurance"]`)
      .first()
      .check();
  }

  async selectReturn() {
    await this.page
      .locator(`input[type="radio"][value="findAnotherWay"]`)
      .first()
      .check();
  }
};
