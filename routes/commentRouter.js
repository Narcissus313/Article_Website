const router = require("express").Router();
// const validateArticleEntries = require("../utils/validateArticleEntries");
// const {
// 	upload,
// 	fileSizeLimitMiddleware,
// } = require("../utils/multer-article-pics-settings");
const { isLoggedIn } = require("../middlewares/auth/auth");
const {
	// getUserArticles,
	addComment,
	updateComment,
	deleteComment,
	// deleteArticle,
	// updateArticle,
	// getSingleArticle,
} = require("../controllers/commentController");
const {
	userIsOwnerOfComment,
} = require("../middlewares/auth/userIsOwnerOfComment");
const validateCommentContent = require("../utils/validateCommentContent");

router.post("/", isLoggedIn, validateCommentContent, addComment);

router.put(
	"/:commentId",
	isLoggedIn,
	validateCommentContent,
	userIsOwnerOfComment,
	updateComment
);

router.delete("/:commentId", isLoggedIn, userIsOwnerOfComment, deleteComment);

/*
router.get("/:articleId", getSingleArticle);

router.get("/pages/:page", isLoggedIn, getUserArticles);

*/

module.exports = router;
