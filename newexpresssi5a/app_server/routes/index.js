var express = require("express");
var router = express.Router();

// import maincontrollers
const maincontrollers = require("../controllers/maincontrollers");

/* GET home page. */
router.get("/", maincontrollers.index);

// GET about page
router.get("/about", maincontrollers.about);

// GET contact page
router.get("/contact", maincontrollers.contact);

// GET prodi page
router.get("/prodi", maincontrollers.prodi);

module.exports = router;
