const express = require("express");
const router = express.Router();

// impor mahasiswaController
const mahasiswaController = require("../controllers/mahasiswaController");

// route GET fakultas
router.get("/", mahasiswaController.getAllMahasiswa);

// expor module
module.exports = router;
