const { Router } = require('express');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const pokemonRoute = require ("./pokemonRoute")
const typeRoute = require ("./typeRoute")

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/pokemons", pokemonRoute)
router.use("/types", typeRoute)

module.exports = router;
