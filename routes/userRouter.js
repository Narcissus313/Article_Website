const express = require("express");
const router = express.Router();
const validateRegisterEntries = require("../utils/validateRegisterEntries");
const validateUpdateEntries = require("../utils/validateUpdateEntries");
const validateUpdatePassword = require("../utils/validateUpdatePassword");
const { avatarSizeLimitMiddleware } = require("../utils/multer-settings");

const {
	getRegisterPage,
	registerUser,
	getLoginPage,
	loginUser,
	getdashboardPage,
	logout,
	uploadAvatar,
	removeAvatar,
	updateUser,
	updatePassword,
	deleteUser,
} = require("../controllers/userControllers");

const { isLoggedIn } = require("../middlewares/auth/auth");

router.get("/register", getRegisterPage);
router.post("/register", validateRegisterEntries, registerUser);

router.get("/login", getLoginPage);
router.post("/login", loginUser);

router.post("/update", validateUpdateEntries, updateUser);
router.post("/updatePassword", validateUpdatePassword, updatePassword);

router.delete("/deleteUser", deleteUser);

router.get("/dashboard", getdashboardPage);

router.get("/logout", isLoggedIn, logout);

router.get("/removeAvatar", isLoggedIn, removeAvatar);

router.post(
	"/uploadAvatar",
	isLoggedIn,
	avatarSizeLimitMiddleware,
	uploadAvatar
);

module.exports = router;
