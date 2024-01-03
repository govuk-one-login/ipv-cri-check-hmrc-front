module.exports = class PlaywrightDevPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.path = "/check/national-insurance-number";
  }

  async continue() {
    await this.page.click("#continue");
  }

  isCurrentPage() {
    const { pathname } = new URL(this.page.url());

    return pathname === this.path;
  }

  async enterNINO(value) {
    await this.page.fill("#nationalInsuranceNumber", value);
  }

  hasErrorSummary() {
    return this.page.locator(".govuk-error-summary");
  }

  async hasErrorBanner() {
    const banner = await this.page.locator(".govuk-notification-banner");
    return banner.isVisible();
  }
};
