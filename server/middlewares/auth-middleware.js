const tokenService = require("../services/token-service");

module.exports = function (req, res, next) {
  try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
      return next(`UnauthorizedError Error, 1`);
    }
    const accessToken = authorizationHeader.split(" ")[1];
    if (!accessToken) {
      return next(`Unauthorized Errorer, 2`);
    }
    const userData = tokenService.validateAccessToken(accessToken);
    if (!userData) {
      return next(`UnauthorizedError error,3 `);
    }
    req.user = userData;
    next();
  } catch (error) {
    return next(`UnauthorizedError 4 ${error}, `);
  }
};
