const router = require("express").Router();
const validateArticleEntries = require("../utils/validateArticleEntries");
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
	getSearchedArticles,
} = require("../controllers/articleController");
const { userIsOwner } = require("../middlewares/auth/userIsOwner");

router.get("/search", getSearchedArticles);

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
	"/:articleId",
	isLoggedIn,
	userIsOwner,
	upload.single("pic"),
	fileSizeLimitMiddleware,
	validateArticleEntries,
	updateArticle
);

module.exports = router;
