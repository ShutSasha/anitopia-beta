const jwt = require("jsonwebtoken");
const { secret } = require("../config");
const ApiError = require("../errors/apiError");
const tokenService = require("../services/TokenService");
module.exports = function (req, res, next) {
	if (req.method === "OPTIONS") {
		next();
	}

	try {
		const authorizationHeader = req.headers.authorization;

		if (!authorizationHeader) {
			return next(
				ApiError.UnauthorizedError("Пользователь не авторизирован")
			);
		}

		const accessToken = authorizationHeader.split(" ")[1];
		if (!accessToken) {
			return next(
				ApiError.UnauthorizedError("Пользователь не авторизирован")
			);
		}

		const userData = tokenService.validateAccessToken(accessToken);

		if (!userData) {
			return next(
				ApiError.UnauthorizedError("Пользователь не авторизирован")
			);
		}

		req.user = userData;
		next();
	} catch (e) {
		return next(ApiError.UnauthorizedError("Пользователь не авторизирован"));
	}
};
