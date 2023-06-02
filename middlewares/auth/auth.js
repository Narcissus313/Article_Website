const isLoggedIn = (req, res, next) => {
	if (!req.session.user) {
		return res.redirect("/api/users/login");
	}

	next();
};

module.exports = {
	isLoggedIn,
};
