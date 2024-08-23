const axios = require("axios");

module.exports = class PlaywrightDevPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page, clientId) {
    this.page = page;

    const websiteHost = process.env.WEBSITE_HOST || "http://localhost:5050";
    this.baseURL = new URL(websiteHost);
    this.relyingPartyURL = new URL(process.env.RELYING_PARTY_URL);

    if (process.env.MOCK_API === "true") {
      this.oauthPath = this.getOauthPath("lorem", clientId);
      this.startingURL = new URL(this.oauthPath, this.baseURL);
    }
  }

  async goto() {
    if (process.env.MOCK_API === "false") {
      this.startingURL = await this.getStartingURLForStub();
    }

    await this.page.goto(this.startingURL.toString());
  }

  getOauthPath(request, clientId) {
    return `/oauth2/authorize?request=${request}&client_id=${clientId}`;
  }

  async getStartingURLForStub() {
    // needed so that the browser has the credentials set
    await this.page.goto(this.relyingPartyURL.href);

    const { data } = await axios.get(
      // TODO configure for each env
      `${this.relyingPartyURL.href}backend/generateInitialClaimsSet?cri=check-hmrc-dev&rowNumber=197`
    );

    const {
      data: { request, client_id },
    } = await axios.post(
      `${this.relyingPartyURL.href}backend/createSessionRequest?cri=check-hmrc-dev&rowNumber=197`,
      data
    );

    this.oauthPath = this.getOauthPath(request, client_id);
    return new URL(this.oauthPath, this.baseURL);
  }

  isRelyingPartyServer() {
    const { origin } = new URL(this.page.url());
    return origin === this.relyingPartyURL.origin;
  }

  hasSuccessQueryParams() {
    const { searchParams } = new URL(this.page.url());

    return (
      !!searchParams.get("client_id") &&
      !!searchParams.get("state") &&
      !!searchParams.get("code")
    );
  }

  hasErrorQueryParams(code) {
    const { searchParams } = new URL(this.page.url());
    return (
      searchParams.get("error") === "server_error" &&
      searchParams.get("error_description") === code
    );
  }

  isErrorCode(code) {
    const { searchParams } = new URL(this.page.url());

    return searchParams.get("error") && searchParams.get("error") === code;
  }
};
