const User = require("../models/User");
const Role = require("../models/Role");
const userService = require("../services/UserService");
const ApiError = require("../errors/apiError");
const multer = require("multer");

class profileController {
	async uploadAvatarUser(req, res, next) {
		try{

			const response = req.files;
			return res.json(response);
			
		}catch (e) {
			console.log(e);
		}
	}
}

module.exports = new profileController();
