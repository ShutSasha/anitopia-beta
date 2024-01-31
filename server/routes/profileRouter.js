const Router = require("express");
const router = new Router();
const profileController = require("../controllers/profileController");
const authMiddleware = require("../middleware/authMiddleware");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

router.post(
	"/uploadAvatar",
	upload.single("img"),
	profileController.uploadAvatarUser
);

module.exports = router;
