const express = require("express");
const router = express.Router();

const validateArticleEntries = require("../utils/validationArticleEntries");
const { isLoggedIn } = require("../middlewares/auth/auth");
const {
	getUserArticles,
	addArticle,
	deleteArticle,
	updateArticle,
} = require("../controllers/userControllers");
const {
	getSingleArticle,
	uploadArticlePic,
} = require("../controllers/articleController");

router.get("/article/:articleId", getSingleArticle);
router.post("/article/uploadPic/:articleId", uploadArticlePic);
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
