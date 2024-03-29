const multer = require("multer");

const avaterStorage = multer.diskStorage({
	destination: function (_req, _file, cb) {
		cb(null, "public/images/userAvatars");
	},
	filename: function (_req, file, cb) {
		cb(null, Date.now() + "-" + file.originalname);
	},
});

const avatarSizeLimitMiddleware = async (req, res, next) => {
	if (req.file && req.file.size > 5 * 1024 * 1024) {
		console.log("req.file.path: ", req.file.path);
		unlink(req.file.path, (err) => {
			if (err) {
				console.error("Error deleting file:", err);
			}
		});
		return res.status(400).json({
			success: false,
			message: "File size exceeds the limit of 5MB",
		});
	}
	next();
};

const userAvatarUpload = multer({
	storage: avaterStorage,
	fileFilter: (_req, file, cb) => {
		if (
			file.mimetype == "image/png" ||
			file.mimetype == "image/jpg" ||
			file.mimetype == "image/jpeg"
		)
			cb(null, true);
		else
			return cb(
				new Error("Only .png, .jpg and .jpeg format allowed!"),
				false
			);
	},
	limits: {
		files: 10,
		// fileSize: 5 * 1024 * 1024,
	},
});

module.exports = {
	userAvatarUpload,
	avatarSizeLimitMiddleware,
};
