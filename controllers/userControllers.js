const url = require("url");
const { join } = require("path");
const fs = require("fs/promises");
const User = require("../models/User");
const Article = require("../models/Article");
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

	res.render("pages/login", { isLoggedIn: !!req.session.user });
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
				return res.json({
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
		const user = await User.updateOne(
			{ _id: req.session.user._id },
			{ $unset: { avatar: 1 } }
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

const bulkUpload = (req, res, _next) => {
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

const deleteUser = async (req, res, _next) => {
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

const getUserArticles = async (req, res, _next) => {
	try {
		if (req.session.user) {
			const id = req.session.user._id;
			const articles = await Article.find({ author: id }).populate(
				"author"
			);

			return res.render("pages/userArticles", {
				articles,
				isLoggedIn: !!req.session.user,
			});
		}
	} catch (error) {
		res.status(500).json({
			success: false,
			message: "Server error in getting articles list!!",
		});
	}
};

const addArticle = async (req, res, _next) => {
	const { title, content } = req.body;
	const author = req.session.user._id;
	const newArticle = new Article({
		title,
		content,
		author,
	});

	try {
		newArticle.save();
		res.json({ success: true, message: "Article saved successfully" });
	} catch (err) {
		res.status(500).json({
			success: false,
			message: "server error!",
		});
	}
};

const showAllArticles = async (req, res) => {
	try {
		const articles = await Article.find({});
		const result = [];
		for (const article of articles) {
			// const x = (await User.findOne({ _id: article.author })).firstName;
			// console.log("x: ", x);
			const articleData = {
				id: article._id,
				title: article.title,
				author:
					(await User.findOne({ _id: article.author })).firstName +
					" " +
					(await User.findOne({ _id: article.author })).lastName,
				createdAt: article.createdAt,
			};
			result.push(articleData);
		}
		res.render("pages/explore", {
			result,
			isLoggedIn: !!req.session.user,
		});
	} catch (error) {
		res.status(500).json({ success: false, message: "server error!" });
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
	bulkUpload,
	updateUser,
	deleteUser,
	getUserArticles,
	addArticle,
	showAllArticles,
};
