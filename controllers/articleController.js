const Article = require("../models/Article");
const { articlePicUpload } = require("../utils/multer-article-pics-settings");
const { unlink, access } = require("node:fs/promises");
const { join } = require("path");
const fs = require("fs/promises");

const uploadArticlePic = async (req, res, _next) => {
	try {
		// await access(
		// 	join(__dirname, "../public/images/articlePics/", articleId + ".jpg")
		// );
		const articleId = req.params.articleId;
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

const getSingleArticle = async (req, res, _next) => {
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

const addArticle = async (req, res, _next) => {
	const { title, summary, content } = req.body;
	const author = req.session.user._id;

	try {
		const newArticle = new Article({
			title,
			content,
			summary,
			author,
		});

		if (req.file)
			newArticle.pic = `/images/articlePics/${newArticle._id.toString()}.jpg`;

		const tempPath = join(
			__dirname,
			"../public",
			"images",
			"articlePics",
			"temp.jpg"
		);
		const finalPath = join(
			__dirname,
			"../public",
			"images",
			"articlePics",
			newArticle._id.toString() + ".jpg"
		);

		await fs.rename(tempPath, finalPath);

		await newArticle.save();

		return res.json({
			success: true,
			message: "Article saved successfully",
		});
	} catch (err) {
		console.error(err);
		res.status(500).json({
			success: false,
			message: "Server error!",
		});
	}
};

const getUserArticles = async (req, res, _next) => {
	try {
		if (req.session.user) {
			const id = req.session.user._id;
			const articles = await Article.find({ author: id }).populate({
				path: "author",
				select: "firstName lastName username",
			});

			return res.render("pages/userArticles", {
				articles,
				userLoggedIn: !!req.session.user,
			});
		}
	} catch (error) {
		res.status(500).json({
			success: false,
			message: "Server error in getting articles list!!",
		});
	}
};

const deleteArticle = async (req, res, _next) => {
	const articleId = req.params.articleId;
	try {
		const deletedArticle = await Article.findByIdAndDelete(articleId);

		if (!deletedArticle) {
			return res
				.status(404)
				.json({ success: false, message: "Article not found" });
		}

		await fs.unlink(
			join(__dirname, "../public/images/articlePics/", articleId + ".jpg")
		);

		return res.json({
			success: true,
			message: "Article deleted successfully",
		});
	} catch (error) {
		res.json({ success: false, message: "There is no pic to delete" });
	}
};

const updateArticle = async (req, res, _next) => {
	const { title, summary, content } = req.body;
	const articleId = req.params.articleId;
	try {
		await Article.findByIdAndUpdate(
			articleId,
			{
				title,
				summary,
				content,
			},
			{ new: true }
		);

		if (!!req.file) {
			const tempPath = join(
				__dirname,
				"../public",
				"images",
				"articlePics",
				"temp.jpg"
			);
			const finalPath = join(
				__dirname,
				"../public",
				"images",
				"articlePics",
				articleId.toString() + ".jpg"
			);

			await fs.rename(tempPath, finalPath);
		}

		return res.json({
			success: true,
			message: "Article updated successfully",
		});
	} catch (err) {
		console.error(err);
		res.status(500).json({
			success: false,
			message: "Server error!",
		});
	}
};

const showAllArticles = async (req, res, _next) => {
	try {
		const articles = await Article.find({}).populate({
			path: "author",
			select: "firstName lastName username",
		});
		res.render("pages/explore", {
			articles,
			userLoggedIn: !!req.session.user,
		});
	} catch (error) {
		res.status(500).json({ success: false, message: "server error!" });
	}
};

module.exports = {
	getSingleArticle,
	// uploadArticlePic,
	getUserArticles,
	addArticle,
	deleteArticle,
	updateArticle,
	showAllArticles,
};
