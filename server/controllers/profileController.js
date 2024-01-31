const User = require("../models/User");
const Role = require("../models/Role");
const userService = require("../services/UserService");
const ApiError = require("../errors/apiError");
const multer = require("multer");
const upload = multer({ dest: "server/uploads/" });
const ImageKit = require("imagekit");
const fs = require('fs');
const uuid = require('uuid')

var imagekit = new ImageKit({
	publicKey: process.env.IMAGE_KIT_PUBLIC_KEY,
	privateKey: process.env.IMAGE_KIT_PRIVATE_KEY,
	urlEndpoint: process.env.IMAGE_KIT_URL_ENDPOINT,
});

class profileController {
	async uploadAvatarUser(req, res, next) {
		try {
			var fileName = uuid.v4() + "jpg";
			const uploadedFile = req.file.path;// Используйте req.file вместо req.files.img
			const fileStream = fs.createReadStream(uploadedFile);

			console.log(uploadedFile.name);
			imagekit.upload({
				file : fileStream, //required
				fileName : fileName,   //required
				folder: 'user_icons',
				extensions: [
				{
					name: "google-auto-tagging",
					maxTags: 5,
					minConfidence: 95
				}
			]
		}, function(error, result) {
				if(error) console.log(error);
				else console.log(result);
			});
		} catch (e) {
			console.error(e);
			next(e); // Передайте ошибку в обработчик ошибок Express
		}
	}
}

module.exports = new profileController();
