// const createError = require("http-errors");

const isLoggedIn = (req, res, next) => {
	if (!req.session.user) {
		res.redirect("/user/login");
	}

	next();
};

module.exports = {
	isLoggedIn,
};
