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

    it("should call abandon endpoint", async () => {
      await controller.saveValues(req, res, next);

      expect(req.axios.post).toHaveBeenCalledWith(
        ABANDON,
        {},
        {
          headers: {
            "session-id": req.session.tokenId,
            "Content-Type": "application/json",
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
        const error = new Error("Async error message");
        req.axios.post = jest.fn().mockRejectedValue(error);

        await controller.saveValues(req, res, next);

        expect(next).toHaveBeenCalledTimes(1);
        expect(next).toHaveBeenCalledWith(error);
      });
    });
  });
});
