const { Router } = require('express');
const pokemonController = require('../controllers/pokemonController')
const router = Router();

router.get("/", pokemonController.getAll)
router.get("/name", pokemonController.getPokeByName)
router.get("/:id", pokemonController.getPokeById)
router.post("/", pokemonController.addNew)
router.post("/:pokemonId/types/:typeId", pokemonController.addTypeToPokemon)


module.exports = router;