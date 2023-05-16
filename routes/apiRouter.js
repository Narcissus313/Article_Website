const express = require("express");
const router = express.Router();
// const User = require("../models/User");
const Article = require("../models/Article");

router.get("/article/:articleId", async (req, res) => {
	const article = await Article.findById(req.params.articleId).populate({
		path: "author",
		select: "firstName lastName username",
	});
	console.log("article: ", article);
	if (!article) res.json({ success: false, message: "Article not found" });
	const isLoggedIn = !!req.session.user;
	res.render("pages/article", { article, isLoggedIn });
	// res.json({success: true, article});
});

module.exports = router;
