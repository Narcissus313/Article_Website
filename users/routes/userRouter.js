const router = require("express").Router();
const validateRegisterEntries = require("../../middlewares/validateRegisterEntries");
const validateUserUpdateEntries = require("../../middlewares/validateUserUpdateEntries");
const validateUserUpdatePassword = require("../../middlewares/validateUserUpdatePassword");
// const userIsAdmin = require("../../middlewares/userIsAdmin");
const userIsAuthorized = require("../../middlewares/userIsAuthorized");
const { avatarSizeLimitMiddleware } = require("../../utils/multer-settings");
const { isLoggedIn, isNotLoggedIn } = require("../../middlewares/auth/auth");
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

router.get("/register", isNotLoggedIn, getRegisterPage);
router.post("/register", isNotLoggedIn, validateRegisterEntries, registerUser);

router.get("/login", isNotLoggedIn, getLoginPage);
router.post("/login", isNotLoggedIn, loginUser);

router.patch(
	"/update",
	userIsAuthorized,
	validateUserUpdateEntries,
	updateUser
);
router.patch(
	"/updatePassword",
	userIsAuthorized,
	validateUserUpdatePassword,
	updatePassword
);

router.delete("/deleteUser", deleteUser);

router.get("/dashboard", isLoggedIn, getdashboardPage);
router.get(
	"/user-info/:userId",
	isLoggedIn,
	// userIsAdmin,
	getUserPageForAdmin
);

router.get(
	"/adminPanel/page/:pageNumber",
	isLoggedIn,
	// userIsAdmin,
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
