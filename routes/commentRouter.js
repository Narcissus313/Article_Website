const router = require("express").Router();
// const validateArticleEntries = require("../utils/validationArticleEntries");
// const {
// 	upload,
// 	fileSizeLimitMiddleware,
// } = require("../utils/multer-article-pics-settings");
const { isLoggedIn } = require("../middlewares/auth/auth");
const {
	// getUserArticles,
	addComment,
	updateComment,
	// deleteArticle,
	// updateArticle,
	// getSingleArticle,
} = require("../controllers/commentController");
const { userIsOwner } = require("../middlewares/auth/userIsOwner");

router.post(
	"/",
	isLoggedIn,
	// upload.single("pic"),
	// validateArticleEntries,
	addComment
);

router.put(
	"/:commentId",
	isLoggedIn,
	// userIsOwner,
	updateComment
);

/*
router.get("/:articleId", getSingleArticle);

router.get("/pages/:page", isLoggedIn, getUserArticles);

router.delete("/:articleId", isLoggedIn, userIsOwner, deleteArticle);
*/

module.exports = router;
