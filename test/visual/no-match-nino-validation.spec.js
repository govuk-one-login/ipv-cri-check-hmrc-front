import { test } from "@playwright/test";
import assert from "node:assert";
import { takeAndCompareScreenshots } from "./helper/screenshot-config.js";
import {
  CouldNotMatchNationalInsurancePage,
  NinoPage,
  RelyingPartyPage,
} from "di-ipv-cri-check-hmrc-front-tests/pages/index.js";

test("Could not match page validation error", async ({ page }) => {
  const rpPage = new RelyingPartyPage(page, "success");
  await rpPage.goto("Happy Harriet");

  const ninoPage = new NinoPage(page);

  await ninoPage.enterNINO("EE123456A");
  await ninoPage.continue();

  const couldNotMatchPage = new CouldNotMatchNationalInsurancePage(page);
  assert.strictEqual(couldNotMatchPage.isCurrentPage(), true);
  await couldNotMatchPage.continue();

  await takeAndCompareScreenshots(page, "could-not-match-validation");
});
