const { Router } = require('express');
const typeController = require('../controllers/typeController')
const router = Router();

router.get("/", typeController.getAll)
router.post("/", typeController.addNew)

module.exports = router;