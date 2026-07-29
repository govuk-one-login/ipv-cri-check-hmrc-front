import { test } from "@playwright/test";
import assert from "node:assert";
import { takeAndCompareScreenshots } from "./helper/screenshot-config.js";
import {
  AbandonPage,
  NinoPage,
  RelyingPartyPage,
} from "di-ipv-cri-check-hmrc-front-tests/pages/index.js";

test("Abandon page validation error", async ({ page }) => {
  const rpPage = new RelyingPartyPage(page, "abandon-fail");
  await rpPage.goto("Happy Harriet");

  const ninoPage = new NinoPage(page);
  await ninoPage.selectAbandon();

  const abandonPage = new AbandonPage(page);

  assert.strictEqual(abandonPage.isCurrentPage(), true);

  await abandonPage.continue();

  await takeAndCompareScreenshots(page, "abandon-validation");
});
