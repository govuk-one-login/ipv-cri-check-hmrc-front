import { test } from "@playwright/test";
import assert from "node:assert";
import { takeAndCompareScreenshots } from "./helper/screenshot-config.js";
import {
  NinoPage,
  RelyingPartyPage,
} from "di-ipv-cri-check-hmrc-front-tests/pages/index.js";

test("Happy path nino success journey", async ({ page }) => {
  const rpPage = new RelyingPartyPage(page, "success");
  await rpPage.goto("Happy Harriet");

  const ninoPage = new NinoPage(page);
  assert.strictEqual(ninoPage.isCurrentPage(), true);
  await takeAndCompareScreenshots(page, "nino");

  await ninoPage.enterNINO("AA123455D");
  await ninoPage.continue();
});
