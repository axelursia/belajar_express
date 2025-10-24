const express = require("express");
const router = express.Router();

// impor fakultasController
const fakultasController = require("../controllers/fakultasController");

// route GET fakultas
router.get("/", fakultasController.getAllFakultas);
router.post("/", fakultasController.createFakultas);
router.get("/:id", fakultasController.getFakultasById);

// expor module
module.exports = router;
