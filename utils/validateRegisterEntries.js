const validator = require("validator");

const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]{4,}$/;

const validateEntries = async (req, res, next) => {
	const {
		firstName,
		lastName,
		username,
		newPassword,
		newPasswordConfirm,
		phoneNumber,
	} = req.body;

	const gender =
		req.body.gender !== "Gender"
			? req.body.gender === "male"
				? "male"
				: "female"
			: "not-set";

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

	if (username?.trim().length < 3 || username?.trim().length > 30)
		return res.json({
			success: false,
			message: "Username must be at least 3 and at most 30 characters",
		});

	if (!validator.isMobilePhone(phoneNumber, "ir-IR"))
		return res.json({
			success: false,
			message: "Phone number not correct",
		});

	if (!newPassword.match(passwordRegex))
		return res.json({
			success: false,
			message:
				"Password must be at least 4 characters long using alpha numeric pattern",
		});

	if (newPassword !== newPasswordConfirm)
		return res.json({
			success: false,
			message: "Passwords do not match",
		});

	res.locals.gender = gender;

	next();
};

module.exports = validateEntries;
