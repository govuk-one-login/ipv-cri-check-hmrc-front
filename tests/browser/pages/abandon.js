module.exports = class PlaywrightDevPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.path = "/check/abandon";
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

  async selectAbandon() {
    await this.page
      .locator(`input[type="radio"][value="abandon"]`)
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
