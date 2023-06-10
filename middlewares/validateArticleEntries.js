const validateArticleEntries = async (req, res, next) => {
	
	const { title, content } = req.body;

	if (title?.trim().length < 1)
		return res.status(400).json({
			success: false,
			message: "Title is required",
		});

	if (content?.trim().length < 1)
		return res.status(400).json({
			success: false,
			message: "Content is required",
		});
	
	next();
};

module.exports = validateArticleEntries;
