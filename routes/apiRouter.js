const express = require("express");
const router = express.Router();
const Article = require("../models/Article");
const { articlePicUpload } = require("../utils/multer-article-pics-settings");

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

router.post("/article/uploadPic/:articleId", (req, res, _next) => {
	const uploadPic = articlePicUpload.single("pic");
	const articleId = req.params.articleId;
	uploadPic(req, res, async (err) => {
		if (err) {
			if (err.code === "LIMIT_FILE_SIZE") {
				return res.json({
					success: false,
					message: "File size limit exceeded",
				});
			}

			if (err.message) {
				return res
					.status(400)
					.json({ success: false, message: err.message });
			}
			return res.status(500).send("server error!");
		}
		try {
			await fs.unlink(
				join(
					__dirname,
					"../public",
					`/images/articlePics/${articleId}.jpg`
				)
			);

			await Article.findByIdAndUpdate(
				articleId,
				{
					pic: `/images/articlePics/${articleId}.jpg`,
				},
				{ new: true }
			);

			return res
				.status(200)
				.json({ success: true, message: "article pic uploaded" });
		} catch (err) {
			return res.status(400).json({
				success: false,
				message: "File size limit exceeded",
			});
		}
	});
});

module.exports = router;
