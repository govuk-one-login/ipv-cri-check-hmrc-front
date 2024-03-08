const BaseController = require("hmpo-form-wizard").Controller;

const {
  API: {
    PATHS: { CHECK },
  },
} = require("../../../lib/config");

class AbandonController extends BaseController {
  async saveValues(req, res, callback) {
    try {
      await req.axios.post(
        CHECK,
        {},
        {
          headers: {
            "session-id": req.session.tokenId,
          },
        }
      );
      super.saveValues(req, res, async () => callback());
    } catch (err) {
      if (err) {
        callback(err);
      }
    }
  }
}

module.exports = AbandonController;
