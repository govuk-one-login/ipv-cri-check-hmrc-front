const BaseController = require("hmpo-form-wizard").Controller;
const Controller = require("../../../../../../src/app/check/controllers/enter-national-insurance-number");

const {
  API: {
    PATHS: { CHECK },
  },
} = require("../../../../../../src/lib/config");

jest.mock();
describe("national insurance number", () => {
  let controller;

  beforeEach(() => {
    controller = new Controller({ route: "/test" });
  });

  it("should be an instance of BaseController", () => {
    controller = new Controller({ route: "/test" });

    expect(controller).toBeInstanceOf(BaseController);
  });

  describe("#saveValues", () => {
    beforeEach(() => {
      req.session.tokenId = "session-id";
      req.axios.post = jest.fn();
      req.form.values.nationalInsuranceNumber = "AA12";
    });
    it("should call check endpoint", async () => {
      await controller.saveValues(req, res, next);

      expect(req.axios.post).toHaveBeenCalledWith(
        CHECK,
        { nino: "AA12" },
        {
          headers: {
            "txma-audit-encoded": "dummy-txma-header",
            "session-id": req.session.tokenId,
          },
          validateStatus: expect.any(Function),
        }
      );
    });

    describe("on API success", () => {
      it("should call next", async () => {
        req.axios.post = jest.fn().mockResolvedValue({});

        await controller.saveValues(req, res, next);

        expect(next).toHaveBeenCalledTimes(1);
        expect(next).toHaveBeenCalledWith();
      });
    });

    describe("with 2xx status", () => {
      it('should set "showRetryErrorSummary" to false', async () => {
        req.axios.post = jest.fn().mockResolvedValue({ status: 201 });

        await controller.saveValues(req, res, next);

        expect(req.session.redirectToRetry).toBeFalsy();
        expect(controller.hasRedirectToRetryShowing(req)).toBeFalsy();
      });
    });

    describe("with 200 status and requestRetry", () => {
      it('should set "showRetryErrorSummary" to true', async () => {
        req.axios.post = jest
          .fn()
          .mockResolvedValue({ status: 200, data: { requestRetry: true } });

        await controller.saveValues(req, res, next);

        expect(req.session.redirectToRetry).toBe(true);
        expect(controller.hasRedirectToRetryShowing(req)).toBe(true);
      });
      it('should not set "showRetryErrorSummary" to true', async () => {
        req.axios.post = jest
          .fn()
          .mockResolvedValue({ status: 200, data: { requestRetry: false } });

        await controller.saveValues(req, res, next);

        expect(req.session.redirectToRetry).toBe(false);
        expect(controller.hasRedirectToRetryShowing(req)).toBe(false);
      });
      it('should not set "showRetryErrorSummary" to true when missing requestRetry', async () => {
        req.axios.post = jest.fn().mockResolvedValue({ status: 200 });

        await controller.saveValues(req, res, next);

        expect(req.session.redirectToRetry).toBe(false);
        expect(controller.hasRedirectToRetryShowing(req)).toBe(false);
      });
    });

    describe("on API failure", () => {
      it("should call next with error", async () => {
        const error = new Error("Async error message");
        req.axios.post = jest.fn().mockRejectedValue(error);

        await controller.saveValues(req, res, next);

        expect(next).toHaveBeenCalledTimes(1);
        expect(next).toHaveBeenCalledWith(error);
      });
    });
  });
});
