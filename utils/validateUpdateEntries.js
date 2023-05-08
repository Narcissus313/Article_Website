const validator = require("validator");
const User = require("../models/User");

const genderOptions = ["not-ser", "male", "female"];

const validateUpdateEntries = async (req, res, next) => {
	const { firstName, lastName, username, phoneNumber, gender } = req.body;

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

	if (!genderOptions.includes(gender))
		return res.json({
			success: false,
			message: "Wrong gender sent",
		});

	try {
		const existingUser = await User.findOne({ phoneNumber });
		if (existingUser.username !== username) {
			return res.json({
				success: false,
				message: "Phone number already exists",
			});
		}

		const user = await User.findOne({ username });

		if (!user) {
			return res.json({
				success: false,
				message: "Username is wrong",
			});
		}

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
