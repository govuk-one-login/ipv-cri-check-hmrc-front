import { vi, it, beforeEach, expect, describe } from "vitest";
import { createDefaultReqResNext } from "../../../../lib/helpers";

const BaseController = require("hmpo-form-wizard").Controller;
const Controller = require("../../../../../../src/app/check/controllers/enter-national-insurance-number");

const {
  API: {
    PATHS: { CHECK },
  },
} = require("../../../../../../src/lib/config");

describe("national insurance number", () => {
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
      vi.clearAllMocks();
      req.form.values.nationalInsuranceNumber = "AA12";
    });
    it("should call check endpoint", async () => {
      await controller.saveValues(req, res, next);

      expect(req.customFetch).toHaveBeenCalledWith(CHECK, {
        method: "POST",
        jsonBody: { nino: "AA12" },
        headers: {
          "txma-audit-encoded": "dummy-txma-header",
          "session-id": req.session.tokenId,
        },
      });
    });

    describe("on API success", () => {
      it("should call next", async () => {
        req.customFetch.mockResolvedValue({});

        await controller.saveValues(req, res, next);

        expect(next).toHaveBeenCalledTimes(1);
        expect(next).toHaveBeenCalledWith();
      });
    });

    describe("with 2xx status", () => {
      it('should set "showRetryErrorSummary" to false', async () => {
        req.customFetch.mockResolvedValue({ status: 201 });

        await controller.saveValues(req, res, next);

        expect(req.session.redirectToRetry).toBeFalsy();
        expect(controller.hasRedirectToRetryShowing(req)).toBeFalsy();
      });
    });

    describe("with 200 status and requestRetry", () => {
      it('should set "showRetryErrorSummary" to true', async () => {
        req.customFetch.mockResolvedValue({
          status: 200,
          data: { requestRetry: true },
        });

        await controller.saveValues(req, res, next);

        expect(req.session.redirectToRetry).toBe(true);
        expect(controller.hasRedirectToRetryShowing(req)).toBe(true);
      });
      it('should not set "showRetryErrorSummary" to true', async () => {
        req.customFetch.mockResolvedValue({
          status: 200,
          data: { requestRetry: false },
        });

        await controller.saveValues(req, res, next);

        expect(req.session.redirectToRetry).toBe(false);
        expect(controller.hasRedirectToRetryShowing(req)).toBe(false);
      });
      it('should not set "showRetryErrorSummary" to true when missing requestRetry', async () => {
        req.customFetch.mockResolvedValue({ status: 200 });

        await controller.saveValues(req, res, next);

        expect(req.session.redirectToRetry).toBe(false);
        expect(controller.hasRedirectToRetryShowing(req)).toBe(false);
      });
    });

    describe("on API failure", () => {
      it("should call next with error", async () => {
        const error = new Error("Async error message");
        req.customFetch.mockRejectedValue(error);

        await controller.saveValues(req, res, next);

        expect(next).toHaveBeenCalledTimes(1);
        expect(next).toHaveBeenCalledWith(error);
      });
    });
  });
});
