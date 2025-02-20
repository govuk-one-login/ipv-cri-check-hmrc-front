module.exports = class PlaywrightDevPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
  }

  async directlyAccessBaseUrl() {
    await this.page.goto(process.env.WEBSITE_HOST || "http://localhost:5020");
  }

  getErrorTitle() {
    return this.page.textContent('[data-id="error-title"]');
  }

  getSomethingWentWrongMessage() {
    return "Sorry, there is a problem with the service";
  }

  getLocalisedSomethingWentWrongMessage(lang) {
    if (lang.toLowerCase() === "welsh") {
      return "Mae'n ddrwg gennym, mae problem";
    } else {
      return "Sorry, there is a problem with the service";
    }
  }

  async toggleLanguage(code) {
    await this.page.click(
      `[data-journey-click="link - click:lang-select:${code}"]`
    );
  }

  isCurrentPage() {
    return this.page.url() === this.url;
  }
};
