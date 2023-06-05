const userIsAdmin = async (req, res, next) => {
	if (req.session.user?.role !== "ADMIN") {
		return res.redirect("/api/users/login");
	}

	next();
};

module.exports = userIsAdmin;
