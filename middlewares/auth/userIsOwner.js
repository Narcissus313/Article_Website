const Article = require("../../models/Article");
const User = require("../../models/User");

const userIsOwner = async (req, res, next) => {
	if (req.session.user?.role === "ADMIN") return next();

	if (!req.session.user) {
		return res.redirect("/user/login");
	}
	const articleAuthorId = (await Article.findById(req.params.articleId))
		.author._id;
	const authorUsername = (await User.findById(articleAuthorId)).username;

	if (req.session.user.username !== authorUsername) {
		return res
			.status(403)
			.json({ success: false, message: "You are not authorized" });
	}

	next();
};

module.exports = {
	userIsOwner,
};
