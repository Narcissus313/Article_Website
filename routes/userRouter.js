const router = require("express").Router();
const validateRegisterEntries = require("../utils/validateRegisterEntries");
const validateUserUpdateEntries = require("../utils/validateUserUpdateEntries");
const validateUserUpdatePassword = require("../utils/validateUserUpdatePassword");
const userIsAdmin = require("../utils/userIsAdmin");
const userIsAuthorized = require("../utils/userIsAuthorized");
const { avatarSizeLimitMiddleware } = require("../utils/multer-settings");
11;
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
	getUserPageForAdmin,
} = require("../controllers/userControllers");

const { isLoggedIn } = require("../middlewares/auth/auth");

router.get("/register", getRegisterPage);
router.post("/register", validateRegisterEntries, registerUser);

router.get("/login", getLoginPage);
router.post("/login", loginUser);

router.patch("/update", validateUserUpdateEntries, userIsAuthorized, updateUser);
router.patch(
	"/updatePassword",
	validateUserUpdatePassword,
	userIsAuthorized,
	updatePassword
);

router.delete("/deleteUser", userIsAuthorized, deleteUser);

router.get("/dashboard", isLoggedIn, getdashboardPage);
router.get("/user-info/:userId", isLoggedIn, userIsAdmin, getUserPageForAdmin);

router.get(
	"/adminPanel/page/:pageNumber",
	isLoggedIn,
	userIsAdmin,
	getAdminPanel
);

router.get("/logout", isLoggedIn, logout);

router.get("/removeAvatar", isLoggedIn, removeAvatar);

router.post(
	"/uploadAvatar",
	isLoggedIn,
	avatarSizeLimitMiddleware,
	uploadAvatar
);

module.exports = router;
