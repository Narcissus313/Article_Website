const User = require("../models/User");

const userIsAuthorized = async (req, res, next) => {
	// console.log("fddd");
	const username = req.body.username;
	// console.log('username: ', username);

	try {
		const user = await User.findOne({ username });
		// console.log('user: ', user);

		if (!user) {
			// console.log("XXX");
			return res.status(400).json({
				success: false,
				message: "Username is wrong",
			});
		}

		// console.log("req.session?.user: ", req.session?.user);
		// console.log("user.username: ", user.username);
		// console.log("req.session?.user.role: ", req.session?.user.role);
		if (
			!(
				req.session?.user.username === user.username ||
				req.session?.user.role === "ADMIN"
			)
		) {
			// console.log("aaaaaaaaaaaaaaaaa");

			return res.status(400).json({
				success: false,
				message: "You are not authorizd",
			});
		}

		// if (req.session.user?.username !== user.username)
		// 	return res.status(400).json({
		// 		success: false,
		// 		message: "You are not authorizd",
		// 	});

		// if (req.session.user?.role !== "ADMIN")
		// 	return res.status(400).json({
		// 		success: false,
		// 		message: "You are not authorizd",
		// 	});

		next();
	} catch (err) {
		return res.status(400).json({
			success: false,
			message: "Server Error",
		});
	}
};

module.exports = userIsAuthorized;
