import { describe, expect, it, beforeEach } from "vitest";
import { createDefaultReqResNext } from "../../../../lib/helpers";

const {
  sessionCheckMiddleware,
} = require("../../../../../../src/app/check/middleware/session-check-middleware");

beforeEach(() => {
  const setup = createDefaultReqResNext();

  global.req = setup.req;
  global.res = setup.res;
  global.next = setup.next;
});
describe("Session Check Middleware", () => {
  it("should call next with no error", async () => {
    req.session.tokenId = "MockTokenID";
    req.session.authParams = { mock: "mock" };

    await sessionCheckMiddleware(req, res, next);

    expect(next).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledWith();
  });

  it("should call next with a error with the code MISSING_AUTHPARAMS", async () => {
    await sessionCheckMiddleware(req, res, next);

    expect(next).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledWith(
      expect.objectContaining({
        message: "Request is missing session data",
        code: "MISSING_SESSION_DATA",
        status: 401,
      })
    );
  });

  it("should call next with an error when no req.session.authParams.state value present", async () => {
    req.session.tokenId = "MockTokenID";

    await sessionCheckMiddleware(req, res, next);

    expect(next).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledWith(
      expect.objectContaining({
        message: "Request is missing session data",
        code: "MISSING_SESSION_DATA",
        status: 401,
      })
    );
  });

  it("should call next with an error when no req.session.tokenId value present", async () => {
    req.session.authParams = { mock: "mock" };

    await sessionCheckMiddleware(req, res, next);

    expect(next).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledWith(
      expect.objectContaining({
        message: "Request is missing session data",
        code: "MISSING_SESSION_DATA",
      })
    );
  });

  it("should call next with an error if req.session is undefined", async () => {
    req = {};

    await sessionCheckMiddleware(req, res, next);

    expect(next).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledWith(
      expect.objectContaining({
        message: "Request is missing session data",
        code: "MISSING_SESSION_DATA",
        status: 401,
      })
    );
  });
});
