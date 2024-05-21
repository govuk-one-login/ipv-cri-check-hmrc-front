const BaseController = require("hmpo-form-wizard").Controller;
const {
  createPersonalDataHeaders,
} = require("@govuk-one-login/frontend-passthrough-headers");

const {
  API: {
    BASE_URL,
    PATHS: { ABANDON },
  },
} = require("../../../lib/config");

class AbandonController extends BaseController {
  async saveValues(req, res, callback) {
    try {
      const headers = {
        "session-id": req.session.tokenId,
        "Content-Type": "application/json",
        ...createPersonalDataHeaders(`${BASE_URL}/${ABANDON}`, req),
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

module.exports = AbandonController;
