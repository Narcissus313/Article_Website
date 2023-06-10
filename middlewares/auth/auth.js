const isLoggedIn = (req, res, next) => {
	if (!req.session?.user) {
		return res.redirect("/api/users/login");
	}
	
	next();
};

const isNotLoggedIn = (req, res, next) => {
	if (req.session?.user) {
		return res.redirect("/api/users/dashboard");
	}

	next();
};

module.exports = { isLoggedIn, isNotLoggedIn };
