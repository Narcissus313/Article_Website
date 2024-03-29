const Article = require("../../models/Article");
const Comment = require("../../models/Comment");
const { unlink, rename } = require("node:fs/promises");
const { join } = require("path");

const getSearchedArticles = async (req, res, _next) => {
	const searchedTitle = req.query.searchText;
	console.log("searchedTitle: ", searchedTitle);
	const page = req.query.page;
	console.log("page: ", page);

	if (page <= 0)
		res.status(400).render("pages/notFound", {
			userLoggedIn: res.locals.userStatus.userIsLoggedIn,
		});

	let articles;

	try {
		if (searchedTitle !== "")
			articles = (
				await Article.find().populate({
					path: "author",
					select: "firstName lastName username",
				})
			)
				// .sort({createdAt: -1})
				.filter((article) =>
					article.title.toLowerCase().includes(searchedTitle)
				);
		else
			articles = await Article.find()
				.populate({
					path: "author",
					select: "firstName lastName username",
				})
				.sort({ createdAt: -1 });
		// .sort({createdAt: -1})

		if (!articles)
			res.status(404).json({
				success: false,
				message: "No Article found",
			});

		const pageSize = 4;
		const totalPages = Math.ceil(articles.length / pageSize) || 1;

		if (page > totalPages)
			return res.render("pages/notFound", {
				userLoggedIn: res.locals.userStatus.userIsLoggedIn,
				userIsAdmin: res.locals.userStatus.userIsAdmin,
			});

		// console.log('articles: ', articles);
		const startIndex = (page - 1) * pageSize;
		const endIndex = startIndex + pageSize;

		const targetArticles = articles.slice(startIndex, endIndex);

		// const userIsAdmin = req.session.user?.role === "ADMIN";

		// res.status(200).json({
		// 	success: true,
		// 	articles: targetArticles,
		// 	page,
		// 	totalPages,
		// 	pageSize,
		// });
		res.render("pages/searchArticlesPage", {
			articles: targetArticles,
			page,
			pageSize,
			totalPages,
			userLoggedIn: res.locals.userStatus.userIsLoggedIn,
			userIsAdmin: res.locals.userStatus.userIsAdmin,
		});
	} catch (error) {
		return res.render("pages/notFound");
	}
};

const getSingleArticle = async (req, res, _next) => {
	const articleId = req.params.articleId;
	// const userLoggedIn = !!req.session.user;
	// const userIsAdmin = !!(req.session?.user?.role === "ADMIN");

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

		console.log("ddD:", res.locals.userStatus);

		const data = {
			article,
			userLoggedIn: res.locals.userStatus.userIsLoggedIn,
			userIsAdmin: res.locals.userStatus.userIsAdmin,
			userIsOwner: false,
			allComments: comments,
		};
		// console.log('data: ', data);

		if (!req.session.user) {
			return res.render("pages/userArticle", data);
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
				userLoggedIn: res.locals.userStatus.userIsLoggedIn,
				userIsAdmin: res.locals.userStatus.userIsAdmin,
				userIsOwner,
				allComments,
			});
		}
		return res.render("pages/userArticle", {
			article,
			userLoggedIn: false,
			userIsAdmin: res.locals.userStatus.userIsAdmin,
			userIsOwner: false,
			allComments,
		});
	} catch (error) {
		return res.render("pages/notFound");
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

		if (!!req.file)
			newArticle.pic = `/images/articlePics/${newArticle._id.toString()}.jpg`;

		const tempPath = join(
			__dirname,
			"../../public",
			"images",
			"articlePics",
			"temp.jpg"
		);
		console.log("tempPath: ", tempPath);
		const finalPath = join(
			__dirname,
			"../../public",
			"images",
			"articlePics",
			newArticle._id.toString() + ".jpg"
		);
		console.log("finalPath: ", finalPath);

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
	// const userIsAdmin = req.session.user?.role === "ADMIN";

	try {
		const page = req.params.page;

		if (page <= 0)
			res.status(400).render("pages/notFound", {
				userLoggedIn: res.locals.userStatus.userIsLoggedIn,
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
				userLoggedIn: res.locals.userStatus.userIsLoggedIn,
				userIsAdmin: res.locals.userStatus.userIsAdmin,
			});

		const startIndex = (page - 1) * pageSize;
		const endIndex = startIndex + pageSize;

		const targetArticles = articles.slice(startIndex, endIndex);

		return res.render("pages/userArticles", {
			articles: targetArticles,
			page,
			totalPages,
			pageSize,
			userIsAdmin: res.locals.userStatus.userIsAdmin,
			userLoggedIn: res.locals.userStatus.userIsLoggedIn,
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
			join(
				__dirname,
				"../../public/images/articlePics/",
				articleId + ".jpg"
			)
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
	req.session.sortBy = requestSortBy;

	res.redirect("/api/users/login");
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

		const userLoggedIn = !!req.session.user;
		const userIsAdmin = req.session.user?.role === "ADMIN";

		if (page > totalPages)
			return res.render("pages/notFound", {
				userLoggedIn,
				userIsAdmin,
			});

		const startIndex = (page - 1) * pageSize;
		const endIndex = startIndex + pageSize;

		const targetArticles = articles.slice(startIndex, endIndex);

		res.render("pages/explore", {
			articles: targetArticles,
			page,
			pageSize,
			totalPages,
			userLoggedIn,
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
	getSearchedArticles,
};
