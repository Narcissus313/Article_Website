const User = require("../models/User");

const userIsAuthorized = async (req, res, next) => {
	const username = req.body?.username;
	const userIsAdmin = res.locals.userStatus.userIsAdmin;
	console.log('userIsAdmin: ', userIsAdmin);

	try {
		if (!!userIsAdmin) return next();

		const user = await User.findOne({ username });
		if (!user) {
			return res.status(400).json({
				success: false,
				message: "User is wrong",
			});
		}

		if (req.session?.user.username !== user.username)
			return res.status(400).json({
				success: false,
				message: "You are not authorizd",
			});

		next();
	} catch (err) {
		return res.status(400).json({
			success: false,
			message: "Server Error",
		});
	}
};

module.exports = userIsAuthorized;
