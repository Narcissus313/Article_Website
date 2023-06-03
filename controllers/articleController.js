const Article = require("../models/Article");
const Comment = require("../models/Comment");
const { unlink } = require("node:fs/promises");
const { join } = require("path");
const fs = require("fs/promises");

const getSingleArticle = async (req, res, _next) => {
	const articleId = req.params.articleId;
	try {
		const article = await Article.findById(articleId)
			.select("-__v -updatedAt")
			.populate({
				path: "author",
				select: "firstName lastName username",
			});

		if (!article)
			res.json({ success: false, message: "Article not found" });

		const comments = await Comment.find({ article: articleId })
			.select("-__v -updatedAt")
			.populate({
				path: "author",
				select: "firstName lastName username avatar",
			});
		// console.log("comments: ", comments);

		const allComments = comments.map((comment) => {
			let forTheUser = false;
			if (comment.author._id.toString() === req.session.user._id) {
				forTheUser = true;
			}

			const newCm = Object.assign(comment._doc, { forTheUser });
			// console.log("newCm: ", newCm);
			const newCm2 = { ...comment, forTheUser };
			// console.log("newCm2: ", newCm2);
			return newCm;
		});
		// console.log("allComments: ", allComments);

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
				allComments,
			});
		}
		return res.render("pages/userArticle", {
			article,
			userLoggedIn: false,
			userIsOwner: false,
			comments,
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
		const page = req.params.page;

		if (page <= 0)
			res.status(400).render("pages/notFound", {
				userLoggedIn: !!req.session.user,
			});

		const id = req.session.user._id;
		const articles = await Article.find({ author: id }).populate({
			path: "author",
			select: "firstName lastName username",
		});

		const pageSize = 4;
		const totalPages = Math.ceil(articles.length / pageSize);
		const startIndex = (page - 1) * pageSize;
		const endIndex = startIndex + pageSize;

		const targetArticles = articles.slice(startIndex, endIndex);

		return res.render("pages/userArticles", {
			articles: targetArticles,
			page,
			totalPages,
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

		const page = req.params.page;
		const pageSize = 4;
		const totalPages = Math.ceil(articles.length / pageSize);
		const startIndex = (page - 1) * pageSize;
		const endIndex = startIndex + pageSize;

		const targetArticles = articles.slice(startIndex, endIndex);

		res.render("pages/explore", {
			articles: targetArticles,
			page,
			totalPages,
			userLoggedIn: !!req.session.user,
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
};
