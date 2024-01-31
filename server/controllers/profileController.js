const User = require("../models/User");
const Role = require("../models/Role");
const userService = require("../services/UserService");
const ApiError = require("../errors/apiError");
const multer = require("multer");

class profileController {
	async uploadAvatarUser(req, res, next) {
		const response = req.files;
		return res.json(response);
	}
}

module.exports = new profileController();
