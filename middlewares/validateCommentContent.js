const validateCommentContent = async (req, res, next) => {
	const { content } = req.body;

	if (content?.trim().length < 1)
		return res.status(400).json({
			success: false,
			message: "Comment is empty",
		});

	next();
};

module.exports = validateCommentContent;
