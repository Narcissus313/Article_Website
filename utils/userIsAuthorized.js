const User = require("../models/User");

const userIsAuthorized = async (req, res, next) => {
	const username = req.body.username;

	try {
		const user = await User.findOne({ username });

		if (!user) {
			return res.status(400).json({
				success: false,
				message: "Username is wrong",
			});
		}

		if (
			!(
				req.session?.user.username === user.username ||
				req.session?.user.role === "ADMIN"
			)
		) {
			return res.status(400).json({
				success: false,
				message: "You are not authorizd",
			});
		}

		next();
	} catch (err) {
		return res.status(400).json({
			success: false,
			message: "Server Error",
		});
	}
};

module.exports = userIsAuthorized;
