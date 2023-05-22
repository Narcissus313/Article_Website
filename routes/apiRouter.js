const express = require("express");
const router = express.Router();
const Article = require("../models/Article");
const { articlePicUpload } = require("../utils/multer-article-pics-settings");
const { unlink, access } = require("node:fs/promises");
const { join } = require("path");
const validateArticleEntries = require("../utils/validationArticleEntries");
const { isLoggedIn } = require("../middlewares/auth/auth");
const {
	getUserArticles,
	addArticle,
	deleteArticle,
	updateArticle,
} = require("../controllers/userControllers");

router.get("/article/:articleId", async (req, res) => {
	// console.log('vvv');
	const articleId = req.params.articleId;
	// console.log('articleId: ', articleId);
	try {
		const article = await Article.findById(articleId).populate({
			path: "author",
			select: "firstName lastName username",
		});
		// console.log('article: ', article);

		if (!article) {
			res.json({ success: false, message: "Article not found" });
		}

		if (!!req.session.user) {
			const userLoggedIn = !!req.session.user;
			if (article.author.username === req.session.user.username) {
				return res.render("pages/userArticle", {
					article,
					userLoggedIn,
				});
			}
			return res.render("pages/anonymousArticle", {
				article,
				userLoggedIn,
			});
		}
		return res.render("pages/anonymousArticle", {
			article,
			userLoggedIn: false,
		});
	} catch (error) {
		return res.redirect("pages/notFound");
	}
});

router.post("/article/uploadPic/:articleId", async (req, res, _next) => {
	try {
		await access(
			join(__dirname, "../public/images/articlePics/", articleId + ".jpg")
		);

		await unlink(
			join(__dirname, "../public", `/images/articlePics/${articleId}.jpg`)
		);
	} catch (error) {
		const uploadPic = articlePicUpload.single("pic");
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
				console.log(4);
				return res.status(500).send("server error!");
			}
		});
	}

	try {
		const articleId = req.params.articleId;

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

router.get("/articles", isLoggedIn, getUserArticles);
router.post("/articles", isLoggedIn, validateArticleEntries, addArticle);
router.delete("/articles/:articleId", isLoggedIn, deleteArticle);
router.patch(
	"/articles/:articleId",
	isLoggedIn,
	validateArticleEntries,
	updateArticle
);

module.exports = router;
