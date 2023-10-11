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
        {
          headers: {
            "session-id": req.session.tokenId,
          },
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
});
