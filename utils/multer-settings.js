const multer = require("multer");

const avaterStorage = multer.diskStorage({
	destination: function (_req, _file, cb) {
		cb(null, "public/images/userAvatars");
	},
	filename: function (_req, file, cb) {
		// if (file.originalname === "grant.png") cb(new Error("Bad file name!"), null);
		cb(null, Date.now() + "-" + file.originalname);
	},
});

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
		fileSize: 5 * 1024 * 1024,
	},
});

module.exports = {
	userAvatarUpload,
	// galleryUpload
};
