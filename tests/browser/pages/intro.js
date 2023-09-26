module.exports = class PlaywrightDevPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.path = "/check/intro";
  }

  async continue() {
    await this.page.click("#continue");
  }

  isCurrentPage() {
    const { pathname } = new URL(this.page.url());

    return pathname === this.path;
  }
};
