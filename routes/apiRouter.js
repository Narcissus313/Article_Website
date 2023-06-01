const express = require("express");
const router = express.Router();
const { userIsOwner } = require("../middlewares/auth/userIsOwner");

const validateArticleEntries = require("../utils/validationArticleEntries");
const {
	upload,
	fileSizeLimitMiddleware,
} = require("../utils/multer-article-pics-settings");
const { isLoggedIn } = require("../middlewares/auth/auth");
const {
	getUserArticles,
	addArticle,
	deleteArticle,
	updateArticle,
} = require("../controllers/articleController");
const { getSingleArticle } = require("../controllers/articleController");

router.get("/article/:articleId", getSingleArticle);

router.get("/articles/:page", isLoggedIn, getUserArticles);

router.delete("/articles/:articleId", isLoggedIn, userIsOwner, deleteArticle);

router.post(
	"/articles",
	isLoggedIn,
	upload.single("pic"),
	validateArticleEntries,
	addArticle
);

router.patch(
	"/articles/:articleId",
	isLoggedIn,
	userIsOwner,
	upload.single("pic"),
	fileSizeLimitMiddleware,
	validateArticleEntries,
	updateArticle
);

module.exports = router;
