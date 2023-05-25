
const isLoggedIn = (req, res, next) => {
	console.log(1);
	if (!req.session.user) {
		res.redirect("/user/login");
	}

	next();
};

module.exports = {
	isLoggedIn,
};
