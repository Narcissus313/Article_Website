const validator = require("validator");
const User = require("../models/User");
// const bcrypt = require("bcryptjs");

const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]{4,}$/;

const validateUpdateEntries = async (req, res, next) => {
	const { firstName, lastName, username, phoneNumber } = req.body;

	// const newPassword = req.body.newPassword ? req.body.newPassword : null;
	// const newPasswordConfirm = req.body.newPasswordConfirm
	// 	? req.body.newPasswordConfirm
	// 	: null;

	if (firstName?.trim().length < 3 || firstName?.trim().length > 30)
		return res.json({
			success: false,
			message: "First name must be at least 3 and at most 30 characters",
		});

	if (lastName?.trim().length < 3 || lastName?.trim().length > 30)
		return res.json({
			success: false,
			message: "Last name must be at least 3 and at most 30 characters",
		});

	if (!validator.isMobilePhone(phoneNumber, "ir-IR"))
		return res.json({
			success: false,
			message: "Phone number not correct",
		});

	try {
		const user = await User.findOne({ username });

		if (!user) {
			return res.json({
				success: false,
				message: "Username is wrong",
			});
		}
		// const isMatch = await user.validatePassword(oldPassword);
		// if (!isMatch) {
		// 	return res.json({
		// 		success: false,
		// 		message: "Password is wrong",
		// 	});
		// }

		// if (newPassword) {
		// 	if (!newPassword.match(passwordRegex))
		// 		return res.json({
		// 			success: false,
		// 			message:
		// 				"New Password must be at least 4 characters long using alpha numeric pattern",
		// 		});

		// 	if (newPassword !== newPasswordConfirm)
		// 		return res.json({
		// 			success: false,
		// 			message: "Passwords do not match",
		// 		});
		// }

		// res.locals.password = newPassword;
		next();
	} catch (err) {
		res.redirect(
			url.format({
				pathname: "/user/login",
				query: {
					errorMessage: "Server Error!",
				},
			})
		);
	}
};

module.exports = validateUpdateEntries;
