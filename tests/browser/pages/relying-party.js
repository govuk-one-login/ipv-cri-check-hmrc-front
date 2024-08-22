const axios = require("axios");

module.exports = class PlaywrightDevPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page, clientId) {
    this.page = page;
    this.clientId = clientId;

    const websiteHost = process.env.WEBSITE_HOST || "http://localhost:5050";
    this.baseURL = new URL(websiteHost);

    if (process.env.MOCK_API) {
      this.oauthPath = `/oauth2/authorize?request=lorem&client_id=${this.clientId}`;
      this.startingURL = new URL(this.oauthPath, this.baseURL);

      this.relyingPartyURL = new URL(process.env.RELYING_PARTY_URL);
    }
  }

  async goto() {
    if (process.env.MOCK_API === "false") {
      // for credentials
      await this.page.goto(process.env.RELYING_PARTY_URL);

      const { data } = await axios.get(
        `${process.env.RELYING_PARTY_URL}/backend/generateInitialClaimsSet?cri=check-hmrc-staging&rowNumber=197`
      );

      const {
        data: { request, client_id },
      } = await axios.post(
        `${process.env.RELYING_PARTY_URL}/backend/createSessionRequest?cri=check-hmrc-staging&rowNumber=197`,
        data
      );

      this.oauthPath = `/oauth2/authorize?request=${request}&client_id=${client_id}`;
      this.startingURL = new URL(this.oauthPath, this.baseURL);
    }

    await this.page.goto(this.startingURL.toString());
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
