const Article = require("../../models/Article");
const User = require("../../models/User");

const userIsOwner = async (req, res, next) => {
	if (req.session.user?.role === "ADMIN") return next();

	// if (!req.session.user) {
	// 	return res.redirect("/user/login");
	// }
	// const articleAuthorId{username:authorUsername} = (await Article.findById(req.params.articleId))
		// .author._id;
	const {username:authorUsername} = (await User.findById(articleAuthorId));

	if (
		req.session.user.username !== authorUsername &&
		req.session.user.role !== "ADMIN"
	) {
		return res
			.status(403)
			.json({ success: false, message: "You are not authorized" });
	}

	next();
};

module.exports = {
	userIsOwner,
};
