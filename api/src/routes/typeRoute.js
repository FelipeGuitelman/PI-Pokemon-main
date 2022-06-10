const { Router } = require('express');
const typeController = require('../controllers/typeController')
const router = Router();

router.get("/", typeController.getAll)

module.exports = router;