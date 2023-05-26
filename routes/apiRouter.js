const express = require("express");
const router = express.Router();

const validateArticleEntries = require("../utils/validationArticleEntries");
const {
	upload,
	fileSizeLimitMiddleware,
} = require("../utils/multer-article-pics-settings");
const { isLoggedIn } = require("../middlewares/auth/auth");
const {
	// showAllArticles,
	getUserArticles,
	addArticle,
	deleteArticle,
	updateArticle,
} = require("../controllers/articleController");
const {
	getSingleArticle,
	uploadArticlePic,
} = require("../controllers/articleController");

router.get("/article/:articleId", getSingleArticle);

// router.post("/article/uploadPic/:articleId", uploadArticlePic);

router.get("/articles", isLoggedIn, getUserArticles);

// router.get("/articles", isLoggedIn, showAllArticles);

router.delete("/articles/:articleId", isLoggedIn, deleteArticle);

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
	upload.single("pic"),
	fileSizeLimitMiddleware,
	validateArticleEntries,
	updateArticle
);

module.exports = router;
