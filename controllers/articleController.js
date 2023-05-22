const Article = require("../models/Article");
const { articlePicUpload } = require("../utils/multer-article-pics-settings");
const { unlink, access } = require("node:fs/promises");
const { join } = require("path");

const uploadArticlePic = async (req, res, _next) => {
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
};

const getSingleArticle = async (req, res) => {
	const articleId = req.params.articleId;
	try {
		const article = await Article.findById(articleId).populate({
			path: "author",
			select: "firstName lastName username",
		});

		if (!article) {
			res.json({ success: false, message: "Article not found" });
		}
		let userIsOwner = false;
		if (!!req.session.user) {
			const userLoggedIn = !!req.session.user;
			if (article.author.username === req.session.user.username) {
				userIsOwner = true;
			}
			return res.render("pages/userArticle", {
				article,
				userLoggedIn,
				userIsOwner,
			});
		}
		return res.render("pages/userArticle", {
			article,
			userLoggedIn: false,
			userIsOwner: false,
		});
	} catch (error) {
		return res.redirect("pages/notFound");
	}
};

module.exports = { getSingleArticle, uploadArticlePic };
