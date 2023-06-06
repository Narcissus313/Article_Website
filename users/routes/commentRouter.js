const router = require("express").Router();
const { isLoggedIn } = require("../../middlewares/auth/auth");
const {
	addComment,
	updateComment,
	deleteComment,
} = require("../controllers/commentController");
const {
	userIsOwnerOfComment,
} = require("../../middlewares/auth/userIsOwnerOfComment");
const validateCommentContent = require("../../utils/validateCommentContent");

// router.use(isLoggedIn);

router.post("/", isLoggedIn, validateCommentContent, addComment);

router.put(
	"/:commentId",
	isLoggedIn,
	userIsOwnerOfComment,
	validateCommentContent,
	updateComment
);

router.delete("/:commentId", isLoggedIn, userIsOwnerOfComment, deleteComment);

module.exports = router;
