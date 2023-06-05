const url = require("url");
const { join } = require("path");
const fs = require("fs/promises");
const User = require("../models/User");
const Article = require("../models/Article");
const Comment = require("../models/Comment");
const { userAvatarUpload } = require("../utils/multer-settings");
const deleteAvatarPic = require("../utils/deleteAvatarPic");

const getRegisterPage = (req, res, _next) => {
	if (req.session.user) return res.redirect("/api/users/login");
	res.render("pages/register", {
		errorMessage: req.query.errorMessage ? req.query.errorMessage : null,
	});
};

const registerUser = async (req, res, _next) => {
	const { firstName, lastName, username, phoneNumber, newPassword } =
		req.body;
	const newUser = new User({
		firstName,
		lastName,
		gender: res.locals.gender,
		username,
		phoneNumber,
		password: newPassword,
		avatar: "/images/userAvatars/default-avatar.png",
	});

	const userExists =
		(await User.findOne({ username })) ||
		(await User.findOne({ phoneNumber }));

	if (userExists)
		return res
			.status(409)
			.json({ success: false, message: "User already exists" });

	try {
		newUser.save();
		res.status(201).json({
			success: true,
			message: "User created successfully",
		});
	} catch (err) {
		res.redirect(
			url.format({
				pathname: "/api/users/register",
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

		res.status(200).json({
			success: true,
			message: "User updated successfully",
		});
	} catch (err) {
		res.redirect(
			url.format({
				pathname: "/api/users/register",
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
		return res.status(200).json({
			success: true,
			message: "Password successfully changed",
		});
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

		res.status(200).json({
			success: true,
			message: "User updated successfully",
		});
	} catch (err) {
		res.redirect(
			url.format({
				pathname: "/api/users/register",
				query: {
					errorMessage: "Server Error!",
				},
			})
		);
	}
};

const getLoginPage = (req, res, _next) => {
	if (req.session.user) return res.redirect("/api/users/dashboard");

	res.render("pages/login", { userLoggedIn: !!req.session.user });
};

const loginUser = async (req, res, _next) => {
	try {
		const user = await User.findOne({ username: req.body.username });

		if (!user) {
			return res.status(400).json({
				success: false,
				message: "Username or password is wrong",
			});
		}
		const isMatch = await user.validatePassword(req.body.password);
		if (!isMatch) {
			return res.status(400).json({
				success: false,
				message: "Username or password is wrong",
			});
		}

		const userData = { ...user._doc };
		delete userData.password;
		delete userData.createdAt;
		delete userData.updatedAt;
		delete userData.__v;

		req.session.user = userData;
		return res.status(200).json({
			success: true,
			message: "Logging in...",
		});
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

const getdashboardPage = (req, res, _next) => {
	if (!req.session.user) return res.redirect("/api/users/login");

	res.render("pages/dashboard", { user: req.session.user });
};

const logout = (req, res, _next) => {
	req.session.destroy();

	res.redirect("/");
};

const uploadAvatar = (req, res, _next) => {
	const uploadUserAvatar = userAvatarUpload.single("avatar");
	uploadUserAvatar(req, res, async (err) => {
		if (err) {
			if (err.code === "LIMIT_FILE_SIZE") {
				// File size limit exceeded
				return res.status(400).json({
					success: false,
					message: "File size limit exceeded",
				});
			}

			if (err.message) {
				return res
					.status(400)
					.json({ success: false, message: err.message });
			}
			return res.status(500).send("server error!");
		}

		try {
			await deleteAvatarPic(req.session.user.avatar);

			const user = await User.findByIdAndUpdate(
				req.session.user._id,
				{
					avatar: "/images/userAvatars/" + req.file.filename,
				},
				{ new: true }
			);
			req.session.user.avatar = user.avatar;

			return res
				.status(200)
				.json({ success: true, message: "avatar uploaded" });
		} catch (err) {
			return res.status(400).json({
				success: false,
				message: "File size limit exceeded",
			});
		}
	});
};

const removeAvatar = async (req, res, _next) => {
	try {
		// delete old avatar
		deleteAvatarPic(req.session.user.avatar);
		const user = await User.findOneAndUpdate(
			{ _id: req.session.user._id },
			{ avatar: "/images/userAvatars/default-avatar.png" },
			{ new: true }
		);

		req.session.user.avatar = user.avatar;

		res.status(200).json({
			success: true,
			message: "Avatar deleted successfully",
		});
	} catch (err) {
		return res.status(400).json({
			success: false,
			message: "File size limit exceeded",
		});
	}
};

const deleteUser = async (req, res, _next) => {
	try {
		const userId = req.session.user._id;
		if (
			req.session.user.avatar !== "/images/userAvatars/default-avatar.png"
		)
			await fs.unlink(
				join(__dirname, "../public", req.session.user.avatar)
			);

		const articleIds = (await Article.find({ author: userId }, "_id")).map(
			(article) => article._id.toString()
		);

		for (const articleId of articleIds) {
			await fs.unlink(
				join(__dirname, `../public/images/articlePics/${articleId}.jpg`)
			);

			await Comment.deleteMany({ article: articleId });
		}

		await Article.deleteMany({ author: userId });
		await Comment.deleteMany({ author: userId });
		await User.deleteOne({ _id: userId });
		req.session.destroy();

		return res
			.status(202)
			.json({ success: true, message: "Account deleted" });
	} catch (error) {
		return res.status(400).json({
			success: false,
			message: "Server couldn't delete the user",
		});
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
	removeAvatar,
	updatePassword,
	updateUser,
	deleteUser,
};
