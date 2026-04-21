import { describe, it, beforeEach } from "node:test";
import assert from "node:assert";
const {
  sessionCheckMiddleware,
} = require("../../../../../../src/app/check/middleware/session-check-middleware");

describe("Session Check Middleware", () => {
  it("should call next with no error", async () => {
    req.session.tokenId = "MockTokenID";
    req.session.authParams = { mock: "mock" };

    await sessionCheckMiddleware(req, res, next);

    assert(next).toHaveBeenCalledTimes(1);
    assert(next).toHaveBeenCalledWith();
  });

  it("should call next with a error with the code MISSING_AUTHPARAMS", async () => {
    await sessionCheckMiddleware(req, res, next);

    assert(next).toHaveBeenCalledTimes(1);
    assert(next).toHaveBeenCalledWith(
      new Error("Request is missing session data")
    );
    assert(next).toHaveBeenCalledWith(
      expect.objectContaining({ code: "MISSING_SESSION_DATA", status: 401 })
    );
  });

  it("should call next with an error when no req.session.authParams.state value present", async () => {
    req.session.tokenId = "MockTokenID";

    await sessionCheckMiddleware(req, res, next);

    assert.strictEqual(next.mock.callCount(), 1);
    const error = next.mock.calls[0].arguments;
    assert.ok(error instanceof Error);
    assert.strictEqual(error.message, "Request is missing session data");

    assert.strictEqual(error.code, "MISSING_SESSION_DATA");
    assert.strictEqual(error.status, 401);
  });

  it("should call next with an error when no req.session.tokenId value present", async () => {
    req.session.authParams = { mock: "mock" };

    await sessionCheckMiddleware(req, res, next);

    assert(next).toHaveBeenCalledTimes(1);
    assert(next).toHaveBeenCalledWith(
      new Error("Request is missing session data")
    );
    assert(next).toHaveBeenCalledWith(
      expect.objectContaining({ code: "MISSING_SESSION_DATA" })
    );
  });

  it("should call next with an error if req.session is undefined", async () => {
    req = {};

    await sessionCheckMiddleware(req, res, next);

    assert(next).toHaveBeenCalledTimes(1);
    assert(next).toHaveBeenCalledWith(
      new Error("Request is missing session data")
    );
    assert(next).toHaveBeenCalledWith(
      expect.objectContaining({ code: "MISSING_SESSION_DATA", status: 401 })
    );
  });
});
