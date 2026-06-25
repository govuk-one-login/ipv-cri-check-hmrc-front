import { test } from "@playwright/test";
import assert from "node:assert";
import { takeAndCompareScreenshots } from "./helper/screenshot-config.js";
import {
  CouldNotMatchNationalInsurancePage,
  NinoPage,
  RelyingPartyPage,
} from "di-ipv-cri-check-hmrc-front-tests/pages/index.js";

test("Could not match the nino user journey", async ({ page }) => {
  const rpPage = new RelyingPartyPage(page, "success");
  await rpPage.goto("Happy Harriet");

  const ninoPage = new NinoPage(page);
  assert.strictEqual(ninoPage.isCurrentPage(), true);

  await ninoPage.enterNINO("EE123456A");
  await ninoPage.continue();

  const couldNotMatchNationalInsurancePage =
    new CouldNotMatchNationalInsurancePage(page);
  assert.strictEqual(couldNotMatchNationalInsurancePage.isCurrentPage(), true);
  await takeAndCompareScreenshots(page, "no-match");
});
