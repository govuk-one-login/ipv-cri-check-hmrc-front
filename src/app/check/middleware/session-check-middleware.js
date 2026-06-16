import loggerModule from "@govuk-one-login/di-ipv-cri-common-express/src/bootstrap/lib/logger.js";
import { PACKAGE_NAME } from "../../../lib/config.js";

const logger = loggerModule.get(PACKAGE_NAME);

export const sessionCheckMiddleware = async (req, res, next) => {
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
};
