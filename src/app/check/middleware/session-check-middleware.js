module.exports = {
  sessionCheckMiddleware: async (req, res, next) => {
    if (!req.session?.tokenId || !req.session?.authParams) {
      const err = new Error("Request is missing session information");
      err.code = "MISSING_AUTHPARAMS";
      next(err);
    } else {
      next();
    }
  },
};
