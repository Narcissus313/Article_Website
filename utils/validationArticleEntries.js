const { articlePicUpload } = require("../utils/multer-article-pics-settings");

const validateArticleEntries = async (req, res, next) => {
	const { title, content } = req.body;
	console.log("title: ", title);

	if (title?.trim().length < 1)
		return res.json({
			success: false,
			message: "Title is required",
		});

	if (content?.trim().length < 1)
		return res.json({
			success: false,
			message: "Content is required",
		});

	const uploadPic = articlePicUpload.single("pic");
	uploadPic(req, res, async (err) => {
		if (err) {
			if (err.code === "LIMIT_FILE_SIZE") {
				return res.json({
					success: false,
					message: "File size limit exceeded",
				});
			}

			if (err.message) {
				return res
					.status(400)
					.json({ success: false, message: err.message });
			}
			return res.status(500).send("server error!");
		}
	});

	next();
};

module.exports = validateArticleEntries;
