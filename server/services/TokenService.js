const jwt = require("jsonwebtoken");
const tokenModel = require("../models/Token");

class TokenService {
	generateToken(payload) {
		const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
			expiresIn: "15m",
		});
		const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
			expiresIn: "30d",
		});

		return {
			accessToken,
			refreshToken,
		};
	}

	//! Юзер не может быть залогиненым одновременно с двух устройств. Так как токен перезапизываеться
	async saveToken(userId, refreshToken) {
		const tokenData = await tokenModel.findOne({ user: userId });
		if (tokenData) {
			tokenData.refreshToken = refreshToken;
			return tokenData.save();
		}

		const token = await tokenModel.create({ user: userId, refreshToken });
		return token;
	}

	async removeToken(refreshToken) {
		const tokenData = await tokenModel.deleteOne({ refreshToken });
		return tokenData;
	}

	validateAccessToken(token) {
		try {
			const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
			return userData;
		} catch (e) {
			return null;
		}
	}

	validateRefreshToken(token) {
		try {
			const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
			return userData;
		} catch (e) {
			return null;
		}
	}

	async findToken(refreshToken) {
		const tokenData = await tokenModel.findOne({ refreshToken });
		return tokenData;
	}
}

module.exports = new TokenService();
