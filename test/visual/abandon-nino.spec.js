import { test } from "@playwright/test";
import assert from "node:assert";
import { takeAndCompareScreenshots } from "./helper/screenshot-config.js";
import {
  AbandonPage,
  NinoPage,
  RelyingPartyPage,
} from "di-ipv-cri-check-hmrc-front-tests/pages/index.js";

test("Abandon the nino user journey", async ({ page }) => {
  const rpPage = new RelyingPartyPage(page, "abandon-fail");
  await rpPage.goto("Happy Harriet");

  const ninoPage = new NinoPage(page);
  assert.strictEqual(ninoPage.isCurrentPage(), true);
  await ninoPage.selectAbandon();

  const abandonPage = new AbandonPage(page);
  assert.strictEqual(abandonPage.isCurrentPage(), true);
  await takeAndCompareScreenshots(page, "abandon");
  await abandonPage.selectAbandon();
  await abandonPage.continue();
});
