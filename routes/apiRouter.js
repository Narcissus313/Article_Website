const express = require("express");
const router = express.Router();
// const User = require("../models/User");
const Article = require("../models/Article");

router.get("/article/:articleId", async (req, res) => {
	const articleId = req.params.articleId;
	try {
		// if (!articleId || isNaN(articleId))
		// 	return res.json({ success: false, message: "Article not found" });

		const article = await Article.findById(articleId).populate({
			path: "author",
			select: "firstName lastName username",
		});
		//! how to send failure message when requested a wrong article id?
		if (!article)
			res.json({ success: false, message: "Article not found" });
		const isLoggedIn = !!req.session.user;
		res.render("pages/article", { article, isLoggedIn });
	} catch (error) {
		// return res.json({ success: false, message: "Article not found" });
		return res.redirect("/pages/notFound");
	}
});

module.exports = router;
