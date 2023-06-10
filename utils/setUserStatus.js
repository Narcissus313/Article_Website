const setUserStatus = (req, res, next) => {
	let userStatus = { userIsLoggedIn: false, userIsAdmin: false };

	if (!!req.session.user) {
		if (req.session.user?.role === "ADMIN")
			userStatus = { userIsLoggedIn: true, userIsAdmin: true };
		userStatus = { userIsLoggedIn: true, userIsAdmin: false };
	}

	res.locals.userStatus = userStatus;
	next();
};

module.exports = setUserStatus;
