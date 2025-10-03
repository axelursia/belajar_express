var express = require("express");
var router = express.Router();

const mainControllers = require("../controllers/maincontrollers");

/* GET home page. */
router.get("/", mainControllers.index);

router.get("/contact", function (req, res, next) {
  res.render("contact", { title: "Contact Us", layout: "main" });
});

router.get("/aboyt", function (req, res, next) {
  res.render("about", { title: "About Us", layout: "main" });
});

router.get("/prodi", function (req, res, next) {
  // Data program studi
  const prodi = [
    { nama: "Teknik Elektro", singkatan: "TE", fakultas: "Fakultas Ilmu Komputer & Rekayasa" },
    { nama: "Informatika", singkatan: "IF", fakultas: "Fakultas Ilmu Komputer & Rekayasa" },
    { nama: "Sistem Informasi", singkatan: "SI", fakultas: "Fakultas Ilmu Komputer & Rekayasa" },
    { nama: "Akuntansi", singkatan: "AK", fakultas: "Fakultas Ekonomi & Bisnis" },
    { nama: "Manajemen", singkatan: "MJ", fakultas: "Fakultas Ekonomi & Bisnis" },
  ];
  res.render("prodi", { prodi, title: "Program Studi", layout: "main" });
});

module.exports = router;
