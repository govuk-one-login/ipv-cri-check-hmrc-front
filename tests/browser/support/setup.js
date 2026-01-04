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
  edge: {
    launch: (options) => chromium.launch({ ...options, channel: "msedge" }),
  },
};

const getBrowsersToLaunch = () => {
  const browsers = process.env.BROWSERS || "chromium";
  return browsers.split(",").map((b) => b.trim());
};

BeforeAll(async function () {
  global.browsers = {};

  const browsersToLaunch = getBrowsersToLaunch();

  for (const browserName of browsersToLaunch) {
    const browserType = browserTypes[browserName];

    if (!browserType) {
      throw new Error(`Unsupported browser: ${browserName}`);
    }

    global.browsers[browserName] = process.env.GITHUB_ACTIONS
      ? await browserType.launch()
      : await browserType.launch({
          headless: false,
          slowMo: 500,
        });
  }
});

AfterAll(async function () {
  for (const browser of Object.values(global.browsers)) {
    await browser.close();
  }
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
  const browserName = process.env.BROWSER || "chromium";

  if (!global.browsers[browserName]) {
    throw new Error(
      `Browser "${browserName}" not launched. Available: ${Object.keys(
        global.browsers
      ).join(", ")}`
    );
  }

  console.log(`NOTE: Running scenarios in browser: ${browserName}`);

  this.browserName = browserName;
  this.context = await global.browsers[browserName].newContext();
  this.page = await this.context.newPage();
});

After(async function () {
  await this.page.close();
  await this.context.close();
});
