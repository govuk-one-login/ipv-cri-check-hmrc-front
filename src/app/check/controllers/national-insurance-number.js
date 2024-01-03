const BaseController = require("hmpo-form-wizard").Controller;

const {
  API: {
    PATHS: { CHECK },
  },
} = require("../../../lib/config");

/* istanbul ignore next @preserve */
const validateStatus = (status) => {
  return (status >= 200 && status < 300) || status == 422;
};

class NationalInsuranceNumberController extends BaseController {
  /* istanbul ignore next @preserve */
  locals(req, res, callback) {
    super.locals(req, res, (err, locals) => {
      if (err) {
        return callback(err, locals);
      }

      locals.showRetryErrorSummary = req.session.showRetryErrorSummary;

      callback(err, locals);
    });
  }

  async saveValues(req, res, callback) {
    super.saveValues(req, res, async () => {
      try {
        const response = await req.axios.post(
          CHECK,
          {
            nino: req.sessionModel.get("nationalInsuranceNumber"),
          },
          {
            headers: {
              "session-id": req.session.tokenId,
            },
            validateStatus,
          }
        );

        if (response.status == 422) {
          req.session.showRetryErrorSummary = true;
        } else {
          req.session.showRetryErrorSummary = false;
        }

        callback();
      } catch (err) {
        /* istanbul ignore next @preserve */
        if (err) {
          callback(err);
        }
      }
    });
  }
  doesNotHaveRetryShowing(req) {
    return req.session?.showRetryErrorSummary != true;
  }
}

module.exports = NationalInsuranceNumberController;
