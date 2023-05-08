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
	const { username, firstName, lastName, password } = req.body;
	// console.log("username: ", username);
	const newUser = new User({
		firstName,
		lastName,
		username,
		password,
	});

	const userExists = await User.findOne({ username });

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
	// const { firstName, username } = req.body;
	// // console.log("username: ", username);
	// // const newUser = new User({
	// // 	firstName,
	// // 	lastName,
	// // 	username,
	// // 	password,
	// // });
	// const user = await User.findOne({ username });

	// // if (userExists)
	// // 	return res.json({ success: false, message: "User already exists" });

	try {
		const user = await User.findByIdAndUpdate(
			req.session.user._id,
			{
				firstName: req.body.firstName,
				lastName: req.body.lastName,
			},
			{ new: true }
		);
		req.session.user.firstName = user.firstName;
		req.session.user.lastName = user.lastName;

		// return res.json(user);
		// res.redirect("/user/dashboard");
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
			message: "Logging in..",
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

const uploadAvatar = (req, res, next) => {
	const uploadUserAvatar = userAvatarUpload.single("avatar");

	uploadUserAvatar(req, res, async (err) => {
		if (err) {
			//delete if save with error
			// if (req.file) await fs.unlink(join(__dirname, "../public", req.file.filename))
			if (err.message) return res.status(400).send(err.message);
			return res.status(500).send("server error!");
		}

		if (!req.file) return res.status(400).send("File not send!");

		try {
			// delete old avatar
			if (req.session.user.avatar)
				await fs.unlink(
					join(__dirname, "../public", req.session.user.avatar)
				);

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
			return next(createError(500, "Server Error!"));
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

module.exports = {
	getRegisterPage,
	registerUser,
	getLoginPage,
	loginUser,
	getdashboardPage,
	logout,
	uploadAvatar,
	bulkUpload,
	updateUser,
};
