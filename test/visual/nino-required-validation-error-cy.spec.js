import { test } from "@playwright/test";
import assert from "node:assert";
import { takeAndCompareScreenshots } from "./helper/screenshot-config.js";
import {
  NinoPage,
  RelyingPartyPage,
} from "di-ipv-cri-check-hmrc-front-tests/pages/index.js";

test("Welsh NINO required validation error", async ({ page }) => {
  const rpPage = new RelyingPartyPage(page, "success");
  await rpPage.goto("Happy Harriet");

  const ninoPage = new NinoPage(page);
  assert.strictEqual(ninoPage.isCurrentPage(), true);

  await ninoPage.continue();

  const url = new URL(page.url());
  url.searchParams.set("lng", "cy");
  await page.goto(url.toString());

  await takeAndCompareScreenshots(page, "nino-required-validation-cy");
});
