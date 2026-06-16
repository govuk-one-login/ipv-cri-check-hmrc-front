import wizard from "hmpo-form-wizard";
import { createPersonalDataHeaders } from "@govuk-one-login/frontend-passthrough-headers";
import { API } from "../../../lib/config.js";

const BaseController = wizard.Controller;
const {
  BASE_URL,
  PATHS: { CHECK },
} = API;

/* istanbul ignore next @preserve */
const validateStatus = (status) => {
  return status >= 200 && status < 300;
};

class EnterNationalInsuranceNumberController extends BaseController {
  async saveValues(req, res, callback) {
    req.session.redirectToRetry = false;
    super.saveValues(req, res, async () => {
      try {
        const headers = {
          "session-id": req.session.tokenId,
          ...createPersonalDataHeaders(`${BASE_URL}${CHECK}`, req),
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

export default EnterNationalInsuranceNumberController;
