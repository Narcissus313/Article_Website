const multer = require("multer");

const picStorage = multer.diskStorage({
	destination: function (_req, _file, cb) {
		cb(null, "public/images/articlePics");
	},
	filename: function (req, _file, cb) {
		cb(null, req.params.articleId + ".jpg");
	},
});

const articlePicUpload = multer({
	storage: picStorage,
	fileFilter: (_req, file, cb) => {
		if (
			file.mimetype == "image/png" ||
			file.mimetype == "image/jpg" ||
			file.mimetype == "image/jpeg"
		)
			cb(null, true);
		else
			return cb(
				new Error("Only .jpg format allowed!"),
				false
			);
	},
	limits: {
		files: 10,
		fileSize: 5 * 1024 * 1024,
	},
});

module.exports = {
	articlePicUpload,
};
