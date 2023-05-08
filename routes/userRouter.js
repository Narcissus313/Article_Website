const express = require("express");
const router = express.Router();
const validateEntries = require("../utils/validateEntries");

const {
	getRegisterPage,
	registerUser,
	getLoginPage,
	loginUser,
	getdashboardPage,
	logout,
	uploadAvatar,
	bulkUpload,
} = require("../controllers/userControllers");

const { isLoggedIn } = require("../middlewares/auth/auth");

router.get("/register", getRegisterPage);

router.post("/register", validateEntries, registerUser);

router.get("/login", getLoginPage);
router.post("/login", loginUser);

router.get("/dashboard", getdashboardPage);

router.get("/logout", isLoggedIn, logout);

router.post("/uploadAvatar", isLoggedIn, uploadAvatar);

//test route
router.post("/bulkUpload", bulkUpload);

module.exports = router;
