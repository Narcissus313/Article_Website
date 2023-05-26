const express = require("express");
const router = express.Router();
const validateRegisterEntries = require("../utils/validateRegisterEntries");
const validateUpdateEntries = require("../utils/validateUpdateEntries");
const validateUpdatePassword = require("../utils/validateUpdatePassword");
const { avatarSizeLimitMiddleware } = require("../utils/multer-settings");
// const validateArticleEntries = require("../utils/validationArticleEntries");

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
	// getUserArticles,
	// addArticle,
	// deleteArticle,
	// updateArticle,
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

// router.get("/articles", isLoggedIn, getUserArticles);
// router.post("/articles", isLoggedIn, validateArticleEntries, addArticle);
// router.delete("/articles/:articleId", isLoggedIn, deleteArticle);
// router.patch(
// 	"/articles/:articleId",
// 	isLoggedIn,
// 	validateArticleEntries,
// 	updateArticle
// );

module.exports = router;
