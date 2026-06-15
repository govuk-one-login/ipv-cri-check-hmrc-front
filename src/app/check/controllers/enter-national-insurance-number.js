const BaseController = require("hmpo-form-wizard").Controller;
const {
  createPersonalDataHeaders,
} = require("@govuk-one-login/frontend-passthrough-headers");
const commonExpress = require("@govuk-one-login/di-ipv-cri-common-express");
const { CustomFetchHttpError } = commonExpress.lib.customFetch;
const {
  API: {
    BASE_URL,
    PATHS: { CHECK },
  },
} = require("../../../lib/config");

class EnterNationalInsuranceNumberController extends BaseController {
  async saveValues(req, res, callback) {
    req.session.redirectToRetry = false;
    super.saveValues(req, res, async () => {
      try {
        const headers = {
          "session-id": req.session.tokenId,
          ...createPersonalDataHeaders(`${BASE_URL}${CHECK}`, req),
        };

        const response = await req.customFetch(CHECK, {
          jsonBody: {
            nino: req.sessionModel
              .get("nationalInsuranceNumber")
              .replaceAll(" ", "")
              .toUpperCase(),
          },
          headers,
        });

        if (response.status >= 300) {
          throw new CustomFetchHttpError(response);
        }

        if (response.status === 200 && response.data.requestRetry === true) {
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

module.exports = EnterNationalInsuranceNumberController;
