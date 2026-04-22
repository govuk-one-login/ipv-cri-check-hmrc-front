require("dotenv").config();
require("axios");

const { chromium, firefox, webkit } = require("playwright");

const {
  Before,
  BeforeAll,
  AfterAll,
  After,
  setDefaultTimeout,
} = require("@cucumber/cucumber");

// FIXME This is large due to cold starts
setDefaultTimeout(30 * 1000);

const browserTypes = {
  chromium,
  firefox,
  webkit,
  edge: {
    launch: (options) => chromium.launch({ ...options, channel: "msedge" }),
  },
};

BeforeAll(async function () {
  // Browsers are expensive in Playwright so only create 1
  const browserName = process.env.BROWSER || "chromium";
  const browserType = browserTypes[browserName];

  if (!browserType) throw new Error(`Unsupported browser: ${browserName}`);

  // eslint-disable-next-line no-console
  console.log(`Running scenarios in browser type: ${browserName}`);
  global.browser = await browserType.launch({
    headless: true,
    slowMo: process.env.GITHUB_ACTIONS ? 0 : 500,
  });
});

AfterAll(async function () {
  await global.browser.close();
});

Before(async function ({ pickle } = {}) {
  // Only if USE_LOCAL_API do we use the @mock-api -> client_id mapping
  if (
    !(
      process.env.USE_LOCAL_API === "true" ||
      process.env.USE_LOCAL_API === undefined
    )
  ) {
    return;
  }

  const tags = pickle.tags || [];
  const tag = tags.find((tag) => tag.name.startsWith("@mock-api:"));

  if (!tag) {
    return;
  }

  const header = tag?.name.substring(10);

  this.TESTING_CLIENT_ID = header;
});

// Create a new test context and page per scenario
Before(async function () {
  this.context = await global.browser.newContext({});

  this.page = await this.context.newPage();
});

// Cleanup after each scenario
After(async function () {
  await this.page.close();
  await this.context.close();
});
