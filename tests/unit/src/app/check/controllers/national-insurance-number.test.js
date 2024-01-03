const BaseController = require("hmpo-form-wizard").Controller;
const Controller = require("../../../../../../src/app/check/controllers/national-insurance-number");

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
        expect.objectContaining({
          headers: {
            "session-id": req.session.tokenId,
          },
        })
      );
    });

    describe("on API success", () => {
      it("should call next", async () => {
        req.axios.post = jest.fn().mockResolvedValue({});

        await controller.saveValues(req, res, next);

        expect(next).toHaveBeenCalledTimes(1);
        expect(next).toHaveBeenCalledWith();
      });

      describe("with 2xx status", () => {
        it('should set "showRetryErrorSummary" to false', async () => {
          req.axios.post = jest.fn().mockResolvedValue({ status: 201 });

          await controller.saveValues(req, res, next);

          expect(req.session.showRetryErrorSummary).toBeFalsy();
        });
      });
      describe("with 422 status", () => {
        it('should set "showRetryErrorSummary" to true', async () => {
          req.axios.post = jest.fn().mockResolvedValue({ status: 422 });

          await controller.saveValues(req, res, next);

          expect(req.session.showRetryErrorSummary).toBeTruthy();
        });
      });
    });

    describe("on API failure", () => {
      it("should call next with error", async () => {
        let error = new Error("Async error message");
        req.axios.post = jest.fn().mockRejectedValue(error);

        await controller.saveValues(req, res, next);

        expect(next).toHaveBeenCalledTimes(1);
        expect(next).toHaveBeenCalledWith(error);
      });
    });
  });

  describe("#doesNotHaveRetryShowing", () => {
    it("should return false if showRetryErrorSummary is missing", () => {
      expect(controller.doesNotHaveRetryShowing({ session: {} })).toBeTruthy();
    });
    it("should return false if showRetryErrorSummary is false", () => {
      expect(
        controller.doesNotHaveRetryShowing({
          session: { showRetryErrorSummary: false },
        })
      ).toBeTruthy();
    });
    it("should return true if showRetryErrorSummary is true", () => {
      expect(
        controller.doesNotHaveRetryShowing({
          session: { showRetryErrorSummary: true },
        })
      ).toBeFalsy();
    });
  });
});
