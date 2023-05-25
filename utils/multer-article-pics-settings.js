const multer = require("multer");
const { join } = require("path");

const storage = multer.diskStorage({
	destination: function (_req, _file, cb) {
		console.log("dest");
		cb(null, join(__dirname, "../public/images/articlePics/"));
	},
	filename: function (req, _file, cb) {
		cb(null, "temp.jpg");
	},
});
const upload = multer({
	storage,
	fileFilter: (_req, file, cb) => {
		if (
			file.mimetype == "image/png" ||
			file.mimetype == "image/jpg" ||
			file.mimetype == "image/jpeg"
		)
			cb(null, true);
		else return cb(new Error("Only .jpg format allowed!"), false);
	},
	limits: {
		files: 10,
		fileSize: 5 * 1024 * 1024,
	},
});

module.exports = {
	upload,
};
