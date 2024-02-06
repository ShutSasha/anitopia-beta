const Router = require("express");
const router = new Router();
const randomAnimeController = require("../controllers/randomAnimeController");

router.get("/", randomAnimeController.getRandomAnime);

module.exports = router;
