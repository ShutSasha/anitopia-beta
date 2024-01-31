const Router = require("express");
const router = new Router();
const profileController = require("../controllers/profileController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/upload-avatar", profileController.uploadAvatarUser);

module.exports = router;
