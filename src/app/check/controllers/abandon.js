const BaseController = require("hmpo-form-wizard").Controller;

const {
  API: {
    PATHS: { ABANDON },
  },
} = require("../../../lib/config");

class AbandonController extends BaseController {
  async saveValues(req, res, callback) {
    try {
      await req.axios.post(ABANDON, undefined, {
        headers: {
          "session-id": req.session.tokenId,
        },
      });
      super.saveValues(req, res, async () => callback());
    } catch (err) {
      if (err) {
        callback(err);
      }
    }
  }
}

module.exports = AbandonController;
