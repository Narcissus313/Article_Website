var router = require("express").Router();

/* GET home page. */
router.get("/", function (_req, res, _next) {
	res.render("index", { title: "Express" });
});

module.exports = router;
