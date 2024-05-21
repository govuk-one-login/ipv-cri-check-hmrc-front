const BaseController = require("hmpo-form-wizard").Controller;
const {
  createPersonalDataHeaders,
} = require("@govuk-one-login/frontend-passthrough-headers");
const {
  API: {
    BASE_URL,
    PATHS: { CHECK },
  },
} = require("../../../lib/config");

/* istanbul ignore next @preserve */
const validateStatus = (status) => {
  return (status >= 200 && status < 300) || status === 422;
};

class NationalInsuranceNumberController extends BaseController {
  async saveValues(req, res, callback) {
    req.session.redirectToRetry = false;
    super.saveValues(req, res, async () => {
      try {
        const headers = {
          "session-id": req.session.tokenId,
          ...createPersonalDataHeaders(`${BASE_URL}/${CHECK}`, req),
        };

        const response = await req.axios.post(
          CHECK,
          {
            nino: req.sessionModel
              .get("nationalInsuranceNumber")
              .replaceAll(" ", "")
              .toUpperCase(),
          },
          {
            headers,
            validateStatus,
          }
        );

        if (response.status === 422) {
          req.session.redirectToRetry = true;
        }

        callback();
      } catch (err) {
        if (err) {
          callback(err);
        }
      }
    });
  }

  hasRedirectToRetryShowing(req) {
    return req.session?.redirectToRetry;
  }
}

module.exports = NationalInsuranceNumberController;
