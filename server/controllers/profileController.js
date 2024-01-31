const User = require("../models/User");
const Role = require("../models/Role");
const userService = require("../services/UserService");
const ApiError = require("../errors/apiError");
const multer = require("multer");
const upload = multer({ dest: "server/uploads/" });

class profileController {
	async uploadAvatarUser(req, res, next) {
		try {
			const uploadedFile = req.file; // Используйте req.file вместо req.files.img
			console.log(uploadedFile);
		} catch (e) {
			console.error(e);
			next(e); // Передайте ошибку в обработчик ошибок Express
		}
	}
}

module.exports = new profileController();
