const User = require("../models/User");
const Role = require("../models/Role");
const userService = require("../services/UserService");
const ApiError = require("../errors/apiError");
const multer = require("multer");
const upload = multer({ dest: "server/uploads/" });

class profileController {
	async uploadAvatarUser(req, res, next) {
		try {
			const { username } = req.body;
			const uploadedFile = req.file.path; // Используйте req.file вместо req.files.img
			const result = await userService.changeUserIcon(
				uploadedFile,
				username
			);
			return res.json(result);
		} catch (e) {
			console.error(e);
			next(e);
		}
	}

	async uploadStatus(req, res, next) {
		try {
			const { username } = req.params;
			const userStatus = await userService.getStatus(username);
			return res.json({ status: userStatus });
		} catch (e) {
			console.log(e);
		}
	}
}

module.exports = new profileController();
