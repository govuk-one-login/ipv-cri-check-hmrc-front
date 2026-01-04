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

setDefaultTimeout(30 * 1000);

const browserTypes = {
  chromium,
  firefox,
  webkit,
  //local only
  edge: {
    launch: (options) => chromium.launch({ ...options, channel: "msedge" }),
  },
};

BeforeAll(async function () {
  const browserName = process.env.BROWSER || "chromium";
  const browserType = browserTypes[browserName];

  if (!browserType) throw new Error(`Unsupported browser: ${browserName}`);
  
  console.log(`NOTE::Running scenarios in browser type: ${browserName}`);
  global.browser = await browserType.launch({
    headless: true,
    slowMo: process.env.GITHUB_ACTIONS ? 0 : 500,
  });
});

AfterAll(async function () {
  await global.browser.close();
});

Before(async function ({ pickle } = {}) {
  if (
    !(
      process.env.USE_LOCAL_API === "true" ||
      process.env.USE_LOCAL_API === undefined
    )
  ) {
    return;
  }

  const tags = pickle?.tags || [];
  const tag = tags.find((t) => t.name.startsWith("@mock-api:"));

  if (!tag) return;

  this.TESTING_CLIENT_ID = tag.name.substring(10);
});

Before(async function () {
  this.context = await global.browser.newContext();
  this.page = await this.context.newPage();
});

After(async function () {
  await this.page.close();
  await this.context.close();
});
