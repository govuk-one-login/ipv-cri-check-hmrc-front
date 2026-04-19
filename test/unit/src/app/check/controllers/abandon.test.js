import { vi, describe, it, beforeEach, expect } from "vitest";
import { createDefaultReqResNext } from "../../../../lib/helpers";

const BaseController = require("hmpo-form-wizard").Controller;
const Controller = require("../../../../../../src/app/check/controllers/abandon");

const {
  API: {
    PATHS: { ABANDON },
  },
} = require("../../../../../../src/lib/config");

describe("abandon", () => {
  let controller;

  beforeEach(() => {
    controller = new Controller({ route: "/test" });
    const setup = createDefaultReqResNext();

    global.req = setup.req;
    global.res = setup.res;
    global.next = setup.next;
  });

  it("should be an instance of BaseController", () => {
    controller = new Controller({ route: "/test" });

    expect(controller).toBeInstanceOf(BaseController);
  });

  describe("#saveValues", () => {
    beforeEach(() => {
      req.session.tokenId = "session-id";
      req.axios.post = vi.fn();
      req.form.values.nationalInsuranceNumber = "AA12";
    });

    it("should call abandon endpoint", async () => {
      await controller.saveValues(req, res, next);

      expect(req.axios.post).toHaveBeenCalledWith(
        ABANDON,
        {},
        {
          headers: {
            "session-id": req.session.tokenId,
            "Content-Type": "application/json",
            "txma-audit-encoded": "dummy-txma-header",
          },
        }
      );
    });

    describe("on API success", () => {
      it("should call next", async () => {
        req.axios.post = vi.fn().mockResolvedValue({});

        await controller.saveValues(req, res, next);

        expect(next).toHaveBeenCalledTimes(1);
        expect(next).toHaveBeenCalledWith();
      });
    });

    describe("on API failure", () => {
      it("should call next with error", async () => {
        const error = new Error("Async error message");
        req.axios.post = vi.fn().mockRejectedValue(error);

        await controller.saveValues(req, res, next);

        expect(next).toHaveBeenCalledTimes(1);
        expect(next).toHaveBeenCalledWith(error);
      });
    });
  });
});
