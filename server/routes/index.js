const Router = require("express");
const router = new Router();
const authRouter = require("./authRouter");
const profileRouter = require("./profileRouter");
const randomAnimeRouter = require("./randomAnimeRouter");
const animeRouter = require("./animeRouter")

router.use("/auth", authRouter);
router.use("/profile", profileRouter);
router.use("/random-anime", randomAnimeRouter);
router.use("/anime-list",animeRouter);

module.exports = router;
