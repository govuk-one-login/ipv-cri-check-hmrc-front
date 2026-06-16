import { vi, describe, it, beforeEach, expect } from "vitest";
import wizard from "hmpo-form-wizard";
import { createDefaultReqResNext } from "../../../../lib/helpers.js";
import Controller from "../../../../../../src/app/check/controllers/abandon.js";
import { API } from "../../../../../../src/lib/config.js";

const BaseController = wizard.Controller;
const {
  PATHS: { ABANDON },
} = API;

describe("abandon", () => {
  let controller;
  let req;
  let res;
  let next;

  beforeEach(() => {
    controller = new Controller({ route: "/test" });
    ({ req, res, next } = createDefaultReqResNext());
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
