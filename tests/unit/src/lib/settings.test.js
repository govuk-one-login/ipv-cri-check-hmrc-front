import { describe, beforeEach, it } from "node:test";
import assert from "node:assert";

const {
  setAPIConfig,
  setOAuthPaths,
} = require("../../../../src/lib/settings.js");

describe("settings", () => {
  let app;

  beforeEach((t) => {
    app = {
      set: t.mock.fn(),
    };
  });

  describe("setAPIConfig", () => {
    it("should set 'API.API_BASE_URL", () => {
      setAPIConfig({ app, baseUrl: "http://example.com" });

      assert.deepStrictEqual(app.set.mock.calls[0].arguments, [
        "API.BASE_URL",
        "http://example.com",
      ]);
    });

    it("should set 'API.PATHS.SESSION", () => {
      setAPIConfig({ app, sessionPath: "/api/session" });

      assert.deepStrictEqual(app.set.mock.calls[0].arguments, [
        "API.PATHS.SESSION",
        "/api/session",
      ]);
    });

    it("should set 'API.PATHS.AUTHORIZATION", () => {
      setAPIConfig({ app, authorizationPath: "/api/authorization" });

      assert.deepStrictEqual(app.set.mock.calls[0].arguments, [
        "API.PATHS.AUTHORIZATION",
        "/api/authorization",
      ]);
    });
  });

  describe("setOAuthPaths", () => {
    it("should set 'APP.PATHS.ENTRYPOINT", () => {
      setOAuthPaths({ app, entryPointPath: "/website/subpath" });
      assert.deepStrictEqual(app.set.mock.calls[0].arguments, [
        "APP.PATHS.ENTRYPOINT",
        "/website/subpath",
      ]);
    });
  });
});
