const { PACKAGE_NAME } = require("../../../lib/config");
const logger =
  require("@govuk-one-login/di-ipv-cri-common-express/src/bootstrap/lib/logger").get(
    PACKAGE_NAME
  );

module.exports = {
  sessionCheckMiddleware: async (req, res, next) => {
    if (!req.session?.tokenId || !req.session?.authParams) {
      logger.error(
        "This request does not have the expected session data, unable to proceed."
      );
      const err = new Error("Request is missing session data");
      err.status = 401;
      err.code = "MISSING_SESSION_DATA";
      next(err);
    } else {
      next();
    }
  },
};
