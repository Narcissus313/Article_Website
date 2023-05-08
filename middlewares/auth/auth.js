const createError = require("http-errors");

const isLoggedIn = (req, res, next) => {
	if (req.session.user) return next();
	// return next(createError(401, "auth error!"));
	res.redirect("/user/login");
};

module.exports = {
	isLoggedIn,
};
