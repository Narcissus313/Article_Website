const setUserStatus = (req, res, next) => {
	let userStatus = { userIsLoggedIn: false, userIsAdmin: false };

	if (!!req.session.user) {
		userStatus = { userIsLoggedIn: true, userIsAdmin: false };
		if (req.session.user?.role === "ADMIN")
			userStatus = { userIsLoggedIn: true, userIsAdmin: true };
	}

	res.locals.userStatus = userStatus;
	next();
};

module.exports = setUserStatus;
