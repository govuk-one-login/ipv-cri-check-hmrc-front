import { describe, beforeEach, it } from "node:test";
import assert from "node:assert";

const {
  setAPIConfig,
  setOAuthPaths,
} = require("../../../../src/lib/settings.js");

describe("settings", () => {
  let app;

  beforeEach(() => {
    app = {
      set: t.mock.fn(),
    };
  });

  describe("setAPIConfig", () => {
    it("should set 'API.API_BASE_URL", () => {
      setAPIConfig({ app, baseUrl: "http://example.com" });

      expect(app.set).toHaveBeenCalledWith(
        "API.BASE_URL",
        "http://example.com"
      );
    });

    it("should set 'API.PATHS.SESSION", () => {
      setAPIConfig({ app, sessionPath: "/api/session" });

      assert(app.set).toHaveBeenCalledWith("API.PATHS.SESSION", "/api/session");
    });

    it("should set 'API.PATHS.AUTHORIZATION", () => {
      setAPIConfig({ app, authorizationPath: "/api/authorization" });

      assert(app.set).toHaveBeenCalledWith(
        "API.PATHS.AUTHORIZATION",
        "/api/authorization"
      );
    });
  });

  describe("setOAuthPaths", () => {
    it("should set 'APP.PATHS.ENTRYPOINT", () => {
      setOAuthPaths({ app, entryPointPath: "/website/subpath" });

      assert(app.set).toHaveBeenCalledWith(
        "APP.PATHS.ENTRYPOINT",
        "/website/subpath"
      );
    });
  });
});
