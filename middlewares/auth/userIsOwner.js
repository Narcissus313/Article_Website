const User = require("../../models/User");
const Article = require("../../models/Article");

const userIsOwner = async (req, res, next) => {
	if (!req.session.user) {
		return res.redirect("/user/login");
	}

	try {
		const articleAuthorId = (await Article.findById(req.params.articleId))
			.author._id;
		const { username: authorUsername } = await User.findById(
			articleAuthorId
		);

		if (
			req.session.user.username !== authorUsername &&
			req.session.user.role !== "ADMIN"
		) {
			return res
				.status(403)
				.json({ success: false, message: "You are not authorized" });
		}

		next();
	} catch {
		return res
			.status(403)
			.json({ success: false, message: "Something went wrong!" });
	}
};

module.exports = {
	userIsOwner,
};
