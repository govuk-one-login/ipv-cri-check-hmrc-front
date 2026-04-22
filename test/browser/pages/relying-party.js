const axios = require("axios");
const { fromNodeProviderChain } = require("@aws-sdk/credential-providers");
const { aws4Interceptor } = require("aws4-axios");

const customCredentialsProvider = {
  getCredentials: fromNodeProviderChain({
    timeout: 1000,
    maxRetries: 0,
  }),
};
const interceptor = aws4Interceptor({
  options: {
    region: "eu-west-2",
    service: "execute-api",
  },
  credentials: customCredentialsProvider,
});

axios.interceptors.request.use(interceptor);

module.exports = class PlaywrightDevPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page, clientId) {
    this.page = page;

    const websiteHost = process.env.WEBSITE_HOST || "http://localhost:5020";
    const relyingPartyURL =
      process.env.RELYING_PARTY_URL || "http://localhost:8080";
    this.baseURL = new URL(websiteHost);
    this.relyingPartyURL = new URL(relyingPartyURL);
    this.env = process.env.ENVIRONMENT || "dev";

    if (
      process.env.USE_LOCAL_API === "true" ||
      process.env.USE_LOCAL_API === undefined
    ) {
      this.oauthPath = this.getOauthPath("lorem", clientId);
      this.startingURL = new URL(this.oauthPath, this.baseURL);
    }
  }

  async goto(sharedClaims) {
    if (process.env.USE_LOCAL_API === "false") {
      this.startingURL = await this.getStartingURLForStub(sharedClaims);
    }

    await this.page.goto(this.startingURL.toString());
  }

  getOauthPath(request, clientId) {
    return `/oauth2/authorize?request=${request}&client_id=${clientId}`;
  }

  async getStartingURLForStub(sharedClaims) {
    try {
      const response = await axios.post(
        `${process.env.RELYING_PARTY_URL}start`,
        {
          aud: process.env.WEBSITE_HOST,
          ...(sharedClaims && { shared_claims: sharedClaims }),
        }
      );

      this.oauthPath = this.getOauthPath(
        response.data.request,
        response.data.client_id
      );

      return new URL(this.oauthPath, this.baseURL);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
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
