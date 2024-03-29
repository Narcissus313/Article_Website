const validator = require("validator");
const User = require("../models/User");

const genderOptions = ["not-set", "male", "female"];

const validateUserUpdateEntries = async (req, res, next) => {
	const { firstName, lastName, username, phoneNumber, gender } = req.body;

	if (firstName?.trim().length < 3 || firstName?.trim().length > 30)
		return res.status(400).json({
			success: false,
			message: "First name must be at least 3 and at most 30 characters",
		});

	if (lastName?.trim().length < 3 || lastName?.trim().length > 30)
		return res.status(400).json({
			success: false,
			message: "Last name must be at least 3 and at most 30 characters",
		});

	if (!validator.isMobilePhone(phoneNumber, "ir-IR"))
		return res.status(400).json({
			success: false,
			message: "Phone number not correct",
		});

	if (!genderOptions.includes(gender))
		return res.status(400).json({
			success: false,
			message: "Wrong gender sent",
		});

	try {
		const user = await User.findOne({ username });

		if (!user) {
			return res.status(400).json({
				success: false,
				message: "Username is wrong",
			});
		}

		const x = await User.findOne({ phoneNumber });

		if (!!x)
			if (x.username !== user.username)
				return res.status(409).json({
					success: false,
					message: "Phone number already exists",
				});

		next();
	} catch (err) {
		res.redirect(
			url.format({
				pathname: "/api/users/login",
				query: {
					errorMessage: "Server Error!",
				},
			})
		);
	}
};

module.exports = validateUserUpdateEntries;
