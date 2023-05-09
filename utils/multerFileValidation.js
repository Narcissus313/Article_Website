const sizeChecker = (req, res, next) => {
	if (req.file.size > 5 * 1024 * 1024)
		return res.status(400).json({
			success: false,
			message: "File size is too large!",
		});
	next();
};

module.exports = sizeChecker;
