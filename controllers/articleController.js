const Article = require("../models/Article");
const Comment = require("../models/Comment");
const { unlink, rename } = require("node:fs/promises");
const { join } = require("path");

const getSingleArticle = async (req, res, _next) => {
	const articleId = req.params.articleId;
	const userLoggedIn = !!req.session.user;
	const userIsAdmin = !!(req.session?.user?.role === "ADMIN");
	console.log("userIsAdmin: ", userIsAdmin);

	try {
		const article = await Article.findById(articleId)
			.select("-__v -updatedAt")
			.populate({
				path: "author",
				select: "firstName lastName username",
			});

		if (!article)
			res.status(404).json({
				success: false,
				message: "Article not found",
			});

		const comments = await Comment.find({ article: articleId })
			.select("-__v -updatedAt")
			.populate({
				path: "author",
				select: "firstName lastName username avatar",
			})
			.sort({ createdAt: -1 });

		if (!req.session.user) {
			return res.render("pages/userArticle", {
				article,
				userLoggedIn,
				userIsAdmin,
				userIsOwner: false,
				allComments: comments,
			});
		}

		const allComments = comments.map((comment) => {
			let forTheUser = false;

			if (comment.author._id.toString() === req.session.user._id) {
				console.log(7);
				forTheUser = true;
			}

			const newCm = Object.assign(comment._doc, { forTheUser });
			return newCm;
		});

		let userIsOwner = false;
		if (!!req.session.user) {
			if (article.author.username === req.session.user.username) {
				userIsOwner = true;
			}
			return res.render("pages/userArticle", {
				article,
				userLoggedIn,
				userIsOwner,
				userIsAdmin,
				allComments,
			});
		}
		return res.render("pages/userArticle", {
			article,
			userLoggedIn: false,
			userIsOwner: false,
			userIsAdmin,
			allComments,
		});
	} catch (error) {
		return res.render("pages/notFound");
	}
};

const addArticle = async (req, res, _next) => {
	userIsOwner;
	const { title, summary, content } = req.body;
	const author = req.session.user._id;

	try {
		const newArticle = new Article({
			title,
			content,
			summary,
			author,
		});

		if (!!req.file)
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

		await rename(tempPath, finalPath);

		await newArticle.save();

		return res.status(201).json({
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
	const userIsAdmin =
		!!req.session.user && !!req.session.user.role === "ADMIN";

	try {
		const page = req.params.page;

		if (page <= 0)
			res.status(400).render("pages/notFound", {
				userLoggedIn: !!req.session.user,
			});

		const id = req.session.user._id;
		const articles = await Article.find({ author: id })
			.populate({
				path: "author",
				select: "firstName lastName username",
			})
			.sort({ createdAt: -1 });

		const pageSize = 4;
		const totalPages = Math.ceil(articles.length / pageSize) || 1;

		if (page > totalPages)
			return res.render("pages/notFound", {
				userLoggedIn: !!req.session.user,
			});

		const startIndex = (page - 1) * pageSize;
		const endIndex = startIndex + pageSize;

		const targetArticles = articles.slice(startIndex, endIndex);

		return res.render("pages/userArticles", {
			articles: targetArticles,
			page,
			totalPages,
			pageSize,
			userIsAdmin,
			userLoggedIn: !!req.session.user,
		});
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

		const deletedComments = await Comment.deleteMany({
			article: articleId,
		});

		if (!deletedComments) {
			return res
				.status(404)
				.json({ success: false, message: "Comments not found" });
		}

		await unlink(
			join(__dirname, "../public/images/articlePics/", articleId + ".jpg")
		);

		return res.status(202).json({
			success: true,
			message: "Article deleted successfully",
		});
	} catch (error) {
		res.status(404).json({
			success: false,
			message: "There is no pic to delete",
		});
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
			await rename(tempPath, finalPath);
		}

		return res.status(200).json({
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

const showArticlesSorted = async (req, res, _next) => {
	const requestSortBy = req.body.sortBy;
	console.log("requestSortBy: ", requestSortBy);
	req.session.sortBy = requestSortBy;
	return res.redirect("/api/users/login");
};

const showAllArticles = async (req, res, _next) => {
	if (!req.session.sortBy) req.session.sortBy = { createdAt: -1 };

	try {
		const articles = await Article.find({})
			.populate({
				path: "author",
				select: "firstName lastName username",
			})
			.sort(req.session.sortBy);

		const page = req.params.page;
		const pageSize = 4;
		const totalPages = Math.ceil(articles.length / pageSize);

		if (page > totalPages)
			return res.render("pages/notFound", {
				userLoggedIn: !!req.session.user,
			});

		const startIndex = (page - 1) * pageSize;
		const endIndex = startIndex + pageSize;

		const targetArticles = articles.slice(startIndex, endIndex);

		// for (const article of targetArticles) {
		// 	console.log("X: ", article.title);
		// }
		const userIsAdmin =
			!!req.session.user && !!req.session.user.role === "ADMIN";

		res.render("pages/explore", {
			articles: targetArticles,
			page,
			pageSize,
			totalPages,
			userLoggedIn: !!req.session.user,
			userIsAdmin,
		});
	} catch (error) {
		res.status(500).json({ success: false, message: "server error!" });
	}
};

module.exports = {
	getSingleArticle,
	getUserArticles,
	addArticle,
	deleteArticle,
	updateArticle,
	showAllArticles,
	showArticlesSorted,
};
