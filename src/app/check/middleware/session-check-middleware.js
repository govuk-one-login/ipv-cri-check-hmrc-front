import loggerModule from "@govuk-one-login/di-ipv-cri-common-express/src/bootstrap/lib/logger.js";
import { PACKAGE_NAME } from "../../../lib/config.js";
import { metrics, captureMetric } from "@govuk-one-login/cri-metrics";

const logger = loggerModule.get(PACKAGE_NAME);

export const sessionCheckMiddleware = async (req, res, next) => {
  logger.info("emitting metrics");

  try {
    metrics.addDimension("testDimension", "yes");
    captureMetric("test-hello");
    metrics.publishStoredMetrics();
  } catch (error) {
    logger.info(error);
  }

  logger.info("metrics emitted");

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
