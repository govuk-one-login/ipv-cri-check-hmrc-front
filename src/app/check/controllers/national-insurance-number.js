const BaseController = require("hmpo-form-wizard").Controller;

const {
  API: {
    PATHS: { CHECK },
  },
} = require("../../../lib/config");

class NationalInsuranceNumberController extends BaseController {
  async saveValues(req, res, callback) {
    super.saveValues(req, res, async () => {
      try {
        await req.axios.post(
          CHECK,
          {
            nino: req.sessionModel.get("nationalInsuranceNumber"),
          },
          {
            headers: {
              "session-id": req.session.tokenId,
            },
          }
        );

        callback();
      } catch (err) {
        if (err) {
          callback(err);
        }
      }
    });
  }
}

module.exports = NationalInsuranceNumberController;
