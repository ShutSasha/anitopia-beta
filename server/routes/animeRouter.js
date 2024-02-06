const Router = require("express");
const router = new Router();
const animeController = require("../controllers/animeController");

router.get("/", animeController.getAnimeList);

module.exports = router;