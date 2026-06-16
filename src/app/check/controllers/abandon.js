import wizard from "hmpo-form-wizard";
import { createPersonalDataHeaders } from "@govuk-one-login/frontend-passthrough-headers";
import { API } from "../../../lib/config.js";

const BaseController = wizard.Controller;
const {
  BASE_URL,
  PATHS: { ABANDON },
} = API;

class AbandonController extends BaseController {
  async saveValues(req, res, callback) {
    try {
      const headers = {
        "session-id": req.session.tokenId,
        "Content-Type": "application/json",
        ...createPersonalDataHeaders(`${BASE_URL}${ABANDON}`, req),
      };

      await req.axios.post(ABANDON, {}, { headers });
      super.saveValues(req, res, async () => callback());
    } catch (err) {
      if (err) {
        callback(err);
      }
    }
  }
}

export default AbandonController;
