const express = require("express");
const router = express.Router();

// impor fakultasController
const fakultasController = require("../controllers/fakultasController");

// route GET fakultas
router.get("/", fakultasController.getAllFakultas);

// expor module
module.exports = router;
