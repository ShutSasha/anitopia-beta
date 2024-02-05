const Router = require("express");
const router = new Router();
const authRouter = require("./authRouter");
const profileRouter = require("./profileRouter");

router.use("/auth", authRouter);
router.use("/profile", profileRouter);

module.exports = router;
