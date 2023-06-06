const Comment = require("../../models/Comment");

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

		return res.status(200).json({
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

const deleteComment = async (req, res, _next) => {
	const commentId = req.params.commentId;
	try {
		const deletedComment = await Comment.findByIdAndDelete(commentId);
		console.log("deletedComment: ", deletedComment);

		if (!deletedComment) {
			return res
				.status(404)
				.json({ success: false, message: "Comment not found" });
		}

		return res.status(202).json({
			success: true,
			message: "Comment deleted successfully",
		});
	} catch (error) {
		res.status(400).json({
			success: false,
			message: "There is no pic to delete",
		});
	}
};

module.exports = {
	addComment,
	updateComment,
	deleteComment,
};
