const Router = require("express");
const router = new Router();
const profileController = require("../controllers/profileController");
const authMiddleware = require("../middleware/authMiddleware");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const roleMiddleware = require("../middleware/roleMiddleware");
router.post(
	"/uploadAvatar",
	upload.single("img"),
	profileController.uploadAvatarUser
);
router.get("/uploadStatus",profileController.uploadStatus);

module.exports = router;
