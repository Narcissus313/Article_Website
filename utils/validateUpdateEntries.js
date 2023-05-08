// const createError = require("http-errors");
// const mongoose = require("mongoose");
const User = require("../models/User");

// mongoose.connect("mongodb://127.0.0.1:27017/Blog88");

const validateEntries = async (req, res, next) => {
	// const { firstName, lastName, username, password } = req.body;
	const { firstName } = req.body;

	if (firstName?.trim().length < 3 || firstName?.trim().length > 30)
		return res.render("pages/register", {
			errorMessage:
				"firstname must be at least 3 and at most 30 characters",
		});

	// if (lastName?.trim().length < 3 || lastName?.trim().length > 30)
	// 	return res.render("pages/register", {
	// 		errorMessage:
	// 			"Lastname must be at least 3 and at most 30 characters",
	// 	});

	// if (username?.trim().length < 3 || username?.trim().length > 30)
	// 	return res.render("pages/register", {
	// 		errorMessage:
	// 			"Username must be at least 3 and at most 30 characters",
	// 	});

	// try {
	// 	const targetUser = await User.findOne({ username: username });
	// 	if (!!targetUser)
	// 		return res.json({ success: false, message: "User already exists" });
	// } catch (error) {}

	// // if (password?.trim().length < 3 || password?.trim().length > 30)
	// // 	return next(
	// // 		createError(
	// // 			400,
	// // 			"lastname must be at least 3 and at most 30 characters"
	// // 		)
	// // 	);
	next();
};

module.exports = validateEntries;
