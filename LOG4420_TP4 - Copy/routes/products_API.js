var express = require("express");
var router = express.Router();

router.get("/", function(req, res) {
  res.render("products", { title: "Accueil", message: "Ça semble fonctionner!" });
  console.log("allo");
});

module.exports = router;