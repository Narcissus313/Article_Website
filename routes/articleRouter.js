const express = require("express");
const router = express.Router();
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
	getSingleArticle,
} = require("../controllers/articleController");
const { userIsOwner } = require("../middlewares/auth/userIsOwner");

router.get("/:articleId", getSingleArticle);

router.get("/pages/:page", isLoggedIn, getUserArticles);

router.delete("/:articleId", isLoggedIn, userIsOwner, deleteArticle);

router.post(
	"/",
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
