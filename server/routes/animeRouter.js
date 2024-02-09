const Router = require("express");
const router = new Router();
const animeController = require("../controllers/animeController");

router.get("/list-anime", animeController.getAnimeList);
router.get("/season-anime", animeController.getAnimeSeason);
router.get("/anime/:id", animeController.getAnime);

module.exports = router;
