const express = require("express");
const router = express.Router();
const validateRegisterEntries = require("../utils/validateRegisterEntries");
const validateUserUpdateEntries = require("../utils/validateUserUpdateEntries");
const validateUserUpdatePassword = require("../utils/validateUserUpdatePassword");
const AdminRoleChecker = require("../utils/userIsAdmin");
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
	getAdminPanel,
} = require("../controllers/userControllers");

const { isLoggedIn } = require("../middlewares/auth/auth");

router.get("/register", getRegisterPage);
router.post("/register", validateRegisterEntries, registerUser);

router.get("/login", getLoginPage);
router.post("/login", loginUser);

router.post("/update", validateUserUpdateEntries, updateUser);
router.post("/updatePassword", validateUserUpdatePassword, updatePassword);

router.delete("/deleteUser", deleteUser);

router.get("/dashboard", getdashboardPage);

router.get("/adminPanel", AdminRoleChecker, getAdminPanel);

router.get("/logout", isLoggedIn, logout);

router.get("/removeAvatar", isLoggedIn, removeAvatar);

router.post(
	"/uploadAvatar",
	isLoggedIn,
	avatarSizeLimitMiddleware,
	uploadAvatar
);

module.exports = router;
