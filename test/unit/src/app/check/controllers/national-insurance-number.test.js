import { vi, it, beforeEach, expect, describe } from "vitest";
import wizard from "hmpo-form-wizard";
import { createDefaultReqResNext } from "../../../../lib/helpers.js";
import Controller from "../../../../../../src/app/check/controllers/enter-national-insurance-number.js";
import { API } from "../../../../../../src/lib/config.js";

const BaseController = wizard.Controller;
const {
  PATHS: { CHECK },
} = API;

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
      req.customFetch = vi
        .fn()
        .mockResolvedValue(new Response(null, { status: 204 }));
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
        req.customFetch = vi
          .fn()
          .mockResolvedValue(new Response(null, { status: 204 }));

        await controller.saveValues(req, res, next);

        expect(next).toHaveBeenCalledTimes(1);
        expect(next).toHaveBeenCalledWith();
      });
    });

    describe("with 2xx status", () => {
      it('should set "showRetryErrorSummary" to false', async () => {
        req.customFetch = vi
          .fn()
          .mockResolvedValue(new Response(null, { status: 201 }));

        await controller.saveValues(req, res, next);

        expect(req.session.redirectToRetry).toBeFalsy();
        expect(controller.hasRedirectToRetryShowing(req)).toBeFalsy();
      });
    });

    describe("with 200 status and requestRetry", () => {
      it('should set "showRetryErrorSummary" to true', async () => {
        req.customFetch = vi
          .fn()
          .mockResolvedValue(
            new Response(JSON.stringify({ requestRetry: true }))
          );

        await controller.saveValues(req, res, next);
        await vi.waitFor(() => expect(next).toHaveBeenCalled());

        expect(req.session.redirectToRetry).toBe(true);
        expect(controller.hasRedirectToRetryShowing(req)).toBe(true);
      });
      it('should not set "showRetryErrorSummary" to true', async () => {
        req.customFetch = vi
          .fn()
          .mockResolvedValue(
            new Response(JSON.stringify({ requestRetry: false }))
          );

        await controller.saveValues(req, res, next);

        expect(req.session.redirectToRetry).toBe(false);
        expect(controller.hasRedirectToRetryShowing(req)).toBe(false);
      });
      it('should not set "showRetryErrorSummary" to true when missing requestRetry', async () => {
        req.customFetch = vi
          .fn()
          .mockResolvedValue(new Response(JSON.stringify({})));

        await controller.saveValues(req, res, next);

        expect(req.session.redirectToRetry).toBe(false);
        expect(controller.hasRedirectToRetryShowing(req)).toBe(false);
      });
    });

    describe("on API failure", () => {
      it("should call next with error", async () => {
        const error = new Error("Async error message");
        req.customFetch = vi.fn().mockRejectedValue(error);

        await controller.saveValues(req, res, next);

        expect(next).toHaveBeenCalledTimes(1);
        expect(next).toHaveBeenCalledWith(error);
      });
    });
  });
});
