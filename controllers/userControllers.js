const createError = require("http-errors");
const url = require("url");
const { join } = require("path");
const fs = require("fs/promises");
const User = require("../models/User");
const { userAvatarUpload } = require("../utils/multer-settings");

const getRegisterPage = (req, res, _next) => {
	if (req.session.user) return res.redirect("/user/dashboard");
	res.render("pages/register", {
		errorMessage: req.query.errorMessage ? req.query.errorMessage : null,
	});
};

const registerUser = async (req, res, _next) => {
	const { firstName, lastName, username, phoneNumber, newPassword, gender } =
		req.body;
	const newUser = new User({
		firstName,
		lastName,
		gender: res.locals.gender,
		username,
		phoneNumber,
		password: newPassword,
	});

	const userExists =
		(await User.findOne({ username })) ||
		(await User.findOne({ phoneNumber }));

	if (userExists)
		return res.json({ success: false, message: "User already exists" });

	try {
		newUser.save();
		res.json({ success: true, message: "User created successfully" });
	} catch (err) {
		res.redirect(
			url.format({
				pathname: "/user/register",
				query: {
					errorMessage: "Server Error!",
				},
			})
		);
	}
};

const updateUser = async (req, res, _next) => {
	try {
		const user = await User.findByIdAndUpdate(
			req.session.user._id,
			{
				firstName: req.body.firstName,
				lastName: req.body.lastName,
				phoneNumber: req.body.phoneNumber,
				gender: req.body.gender,
			},
			{ new: true }
		);
		req.session.user.firstName = user.firstName;
		req.session.user.lastName = user.lastName;
		req.session.user.phoneNumber = user.phoneNumber;
		req.session.user.gender = user.gender;

		res.json({ success: true, message: "User updated successfully" });
	} catch (err) {
		res.redirect(
			url.format({
				pathname: "/user/register",
				query: {
					errorMessage: "Server Error!",
				},
			})
		);
	}
};

const updatePassword = async (req, res, _next) => {
	try {
		const user = await User.findByIdAndUpdate(
			req.session.user._id,
			{
				password: res.locals.password,
			},
			{ new: true }
		);

		req.session.user = user;
		return res.json({
			success: true,
			message: "Password successfully changed",
		});
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

	try {
		const user = await User.findByIdAndUpdate(
			req.session.user._id,
			{
				firstName: req.body.firstName,
				lastName: req.body.lastName,
				phoneNumber: req.body.phoneNumber,
			},
			{ new: true }
		);
		req.session.user.firstName = user.firstName;
		req.session.user.lastName = user.lastName;
		req.session.user.phoneNumber = user.phoneNumber;

		res.json({ success: true, message: "User updated successfully" });
	} catch (err) {
		res.redirect(
			url.format({
				pathname: "/user/register",
				query: {
					errorMessage: "Server Error!",
				},
			})
		);
	}
};

const getLoginPage = (req, res, _next) => {
	if (req.session.user) return res.redirect("/user/dashboard");

	const { errorMessage = null, message = null } = req.query;
	res.render("pages/login", { errorMessage, message });
};

const loginUser = async (req, res, next) => {
	try {
		const user = await User.findOne({ username: req.body.username });

		if (!user) {
			return res.json({
				success: false,
				message: "Username or password is wrong",
			});
		}
		const isMatch = await user.validatePassword(req.body.password);
		if (!isMatch) {
			return res.json({
				success: false,
				message: "Username or password is wrong",
			});
		}

		req.session.user = user;
		return res.json({
			success: true,
			message: "Logging in...",
		});
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

const getdashboardPage = (req, res, next) => {
	if (!req.session.user) return res.redirect("/user/login");

	res.render("pages/dashboard", { user: req.session.user });
};

const logout = (req, res, next) => {
	req.session.destroy();

	res.redirect("/user/login");
};

const uploadAvatar = (req, res, _next) => {
	const uploadUserAvatar = userAvatarUpload.single("avatar");

	uploadUserAvatar(req, res, async (err) => {
		if (err) {
			//delete if save with error
			// if (req.file) await fs.unlink(join(__dirname, "../public", req.file.filename))
			if (err.message)
				return res
					.status(400)
					.json({ success: false, message: err.message });
			return res.status(500).send("server error!");
		}

		// if (!req.file)
		// 	return res
		// 		.status(400)
		// 		.json({ success: false, message: "File not send!" });

		try {
			// delete old avatar
			if (req.session.user.avatar) {
				await fs.unlink(
					join(__dirname, "../public", req.session.user.avatar)
				);
			}

			const user = await User.findByIdAndUpdate(
				req.session.user._id,
				{
					avatar: "/images/userAvatars/" + req.file.filename,
				},
				{ new: true }
			);

			req.session.user.avatar = user.avatar;

			// return res.json(user);
			res.redirect("/user/dashboard");
		} catch (err) {
			// return next(createError(500, "Server Error!"));
			return res.status(400).json({
				success: false,
				message: "File size limit exceeded",
			});
		}
	});
};

const bulkUpload = (req, res, next) => {
	const uploadUserAvatar = userAvatarUpload.array("gallery");

	uploadUserAvatar(req, res, async (err) => {
		if (err) {
			if (err.message) return res.status(400).send(err.message);
			return res.status(500).send("server error!");
		}

		console.log(req.file);
		console.log(req.files);

		res.json({
			file: req.file,
			files: req.files,
		});
	});
};

const deleteUser = async (req, res, next) => {
	try {
		const userId = req.session.user._id;
		await User.deleteOne({ _id: userId });
		req.session.destroy();
		return res.json({ success: true, message: "Account deleted" });
	} catch (error) {
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

module.exports = {
	getRegisterPage,
	registerUser,
	getLoginPage,
	loginUser,
	getdashboardPage,
	logout,
	uploadAvatar,
	updatePassword,
	bulkUpload,
	updateUser,
	deleteUser,
};
