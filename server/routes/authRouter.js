const Router = require("express");
const router = new Router();
const authController = require("../controllers/authController");
const roleMiddleware = require("../middleware/roleMiddleware");
const { validateRegistration } = require("../validators/registration");

router.post(
	"/registration",
	validateRegistration(),
	authController.registration
);
router.post("/login", authController.login);
router.get("/users", roleMiddleware(["ADMIN"]), authController.getUsers);
router.post("/logout", authController.logout);
router.get("/activate/:link", authController.activate);
router.get("/refresh", authController.refresh);

module.exports = router;
