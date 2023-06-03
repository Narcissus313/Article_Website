const Comment = require("../../models/Comment");
const User = require("../../models/User");

const userIsOwnerOfComment = async (req, res, next) => {
	if (!req.session.user) {
		return res.redirect("/api/users/login");
	}
	const commentId = req.params.commentId;
	const commentAuthorId = (
		await Comment.findById(commentId)
	).author._id.toString();
	const userId = req.session.user._id;

	if (commentAuthorId !== userId) {
		return res.json({ success: false, message: "You are not authorized" });
	}

	next();
};

module.exports = {
	userIsOwnerOfComment,
};
