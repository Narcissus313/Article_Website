const multer = require("multer");
const { join } = require("path");
const { unlink } = require("fs/promises");

const storage = multer.diskStorage({
	destination: function (_req, _file, cb) {
		cb(null, join(__dirname, "../public/images/articlePics/"));
	},
	filename: function (_req, _file, cb) {
		cb(null, "temp.jpg");
	},
});

const fileSizeLimitMiddleware = async (req, res, next) => {
	if (req.file && req.file.size > 1 * 1024 * 1024) {
		console.log("req.file.path: ", req.file.path);
		unlink(req.file.path, (err) => {
			if (err) {
				console.error("Error deleting file:", err);
			}
		});
		return res.status(400).json({
			success: false,
			message: "File size exceeds the limit of 1MB",
		});
	}
	next();
};

const upload = multer({
	storage,
	fileFilter: (_req, file, cb) => {
		if (
			file.mimetype == "image/png" ||
			file.mimetype == "image/jpg" ||
			file.mimetype == "image/jpeg"
		)
			cb(null, true);
		else return cb(new Error("Only .jpg .jpeg .png format allowed!"), false);
	},
	limits: {
		files: 10,
		// fileSize: 1 * 1024 * 1024, // 1MB file size limit
	},
});

module.exports = {
	upload,
	fileSizeLimitMiddleware,
};
