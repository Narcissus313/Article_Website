// const Article = require("../models/Article");
const Comment = require("../models/Comment");
// const { unlink } = require("node:fs/promises");
// const { join } = require("path");
// const fs = require("fs/promises");

const addComment = async (req, res, _next) => {
	const { content, article } = req.body;
	const author = req.session.user._id;

	try {
		const newComment = new Comment({
			content,
			article,
			author,
		});

		await newComment.save();

		return res.status(200).json({
			success: true,
			message: "Your comment saved successfully",
		});
	} catch (err) {
		console.error(err);
		res.status(500).json({
			success: false,
			message: "Server error!",
		});
	}
};

const updateComment = async (req, res, _next) => {
	const { content } = req.body;
	const commentId = req.params.commentId;

	try {
		await Comment.findByIdAndUpdate(
			commentId,
			{
				content,
			},
			{ new: true }
		);

		return res.json({
			success: true,
			message: "Comment updated successfully",
		});
	} catch (err) {
		console.error(err);
		res.status(500).json({
			success: false,
			message: "Server error!",
		});
	}
};

/*

*/

// const getSingleArticle = async (req, res, _next) => {
// 	const articleId = req.params.articleId;
// 	try {
// 		const article = await Article.findById(articleId).populate({
// 			path: "author",
// 			select: "firstName lastName username",
// 		});

// 		if (!article) {
// 			res.json({ success: false, message: "Article not found" });
// 		}

// 		let userIsOwner = false;
// 		if (!!req.session.user) {
// 			const userLoggedIn = !!req.session.user;
// 			if (article.author.username === req.session.user.username) {
// 				userIsOwner = true;
// 			}
// 			return res.render("pages/userArticle", {
// 				article,
// 				userLoggedIn,
// 				userIsOwner,
// 			});
// 		}
// 		return res.render("pages/userArticle", {
// 			article,
// 			userLoggedIn: false,
// 			userIsOwner: false,
// 		});
// 	} catch (error) {
// 		return res.redirect("pages/notFound");
// 	}
// };

// const getUserArticles = async (req, res, _next) => {
// 	try {
// 		const page = req.params.page;

// 		if (page <= 0)
// 			res.status(400).render("pages/notFound", {
// 				userLoggedIn: !!req.session.user,
// 			});

// 		const id = req.session.user._id;
// 		const articles = await Article.find({ author: id }).populate({
// 			path: "author",
// 			select: "firstName lastName username",
// 		});

// 		const pageSize = 4;
// 		const totalPages = Math.ceil(articles.length / pageSize);
// 		const startIndex = (page - 1) * pageSize;
// 		const endIndex = startIndex + pageSize;

// 		const targetArticles = articles.slice(startIndex, endIndex);

// 		return res.render("pages/userArticles", {
// 			articles: targetArticles,
// 			page,
// 			totalPages,
// 			userLoggedIn: !!req.session.user,
// 		});
// 	} catch (error) {
// 		res.status(500).json({
// 			success: false,
// 			message: "Server error in getting articles list!!",
// 		});
// 	}
// };

// const deleteArticle = async (req, res, _next) => {
// 	const articleId = req.params.articleId;
// 	try {
// 		const deletedArticle = await Article.findByIdAndDelete(articleId);

// 		if (!deletedArticle) {
// 			return res
// 				.status(404)
// 				.json({ success: false, message: "Article not found" });
// 		}

// 		await unlink(
// 			join(__dirname, "../public/images/articlePics/", articleId + ".jpg")
// 		);

// 		return res.json({
// 			success: true,
// 			message: "Article deleted successfully",
// 		});
// 	} catch (error) {
// 		res.json({ success: false, message: "There is no pic to delete" });
// 	}
// };

// const updateArticle = async (req, res, _next) => {
// 	const { title, summary, content } = req.body;
// 	const articleId = req.params.articleId;
// 	try {
// 		await Article.findByIdAndUpdate(
// 			articleId,
// 			{
// 				title,
// 				summary,
// 				content,
// 			},
// 			{ new: true }
// 		);

// 		if (!!req.file) {
// 			const tempPath = join(
// 				__dirname,
// 				"../public",
// 				"images",
// 				"articlePics",
// 				"temp.jpg"
// 			);
// 			const finalPath = join(
// 				__dirname,
// 				"../public",
// 				"images",
// 				"articlePics",
// 				articleId.toString() + ".jpg"
// 			);

// 			await fs.rename(tempPath, finalPath);
// 		}

// 		return res.json({
// 			success: true,
// 			message: "Article updated successfully",
// 		});
// 	} catch (err) {
// 		console.error(err);
// 		res.status(500).json({
// 			success: false,
// 			message: "Server error!",
// 		});
// 	}
// };

// const showAllArticles = async (req, res, _next) => {
// 	try {
// 		const articles = await Article.find({}).populate({
// 			path: "author",
// 			select: "firstName lastName username",
// 		});

// 		const page = req.params.page;
// 		const pageSize = 4;
// 		const totalPages = Math.ceil(articles.length / pageSize);
// 		const startIndex = (page - 1) * pageSize;
// 		const endIndex = startIndex + pageSize;

// 		const targetArticles = articles.slice(startIndex, endIndex);

// 		res.render("pages/explore", {
// 			articles: targetArticles,
// 			page,
// 			totalPages,
// 			userLoggedIn: !!req.session.user,
// 		});
// 	} catch (error) {
// 		res.status(500).json({ success: false, message: "server error!" });
// 	}
// };

module.exports = {
	// getSingleArticle,
	// getUserArticles,
	addComment,
	updateComment,
	// deleteArticle,
	// updateArticle,
	// showAllArticles,
};
