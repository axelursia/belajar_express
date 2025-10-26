// app_api/routes/berita.js
const express = require("express");
const router = express.Router();
const beritaController = require("../controllers/beritaController.js");

// endpoint: GET /api/berita
router.get("/", beritaController.getAllBerita);

// endpoint: POST /api/berita
router.post("/", beritaController.createBerita);

module.exports = router;
