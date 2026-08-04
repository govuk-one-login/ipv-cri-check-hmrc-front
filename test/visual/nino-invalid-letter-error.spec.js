import { test } from "@playwright/test";
import { takeAndCompareScreenshots } from "./helper/screenshot-config.js";
import {
  NinoPage,
  RelyingPartyPage,
} from "di-ipv-cri-check-hmrc-front-tests/pages/index.js";

test("NINO invalid letter validation error", async ({ page }) => {
  const rpPage = new RelyingPartyPage(page, "success");
  await rpPage.goto("Happy Harriet");

  const ninoPage = new NinoPage(page);

  await ninoPage.enterNINO("GB123456A");
  await ninoPage.continue();

  await takeAndCompareScreenshots(page, "nino-invalid-letter-validation");
});
