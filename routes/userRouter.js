const express = require("express");
const router = express.Router();
const validateRegisterEntries = require("../utils/validateRegisterEntries");
const validateUpdateEntries = require("../utils/validateUpdateEntries");
const validateUpdatePassword = require("../utils/validateUpdatePassword");

const {
	getRegisterPage,
	registerUser,
	getLoginPage,
	loginUser,
	getdashboardPage,
	logout,
	uploadAvatar,
	removeAvatar,
	bulkUpload,
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

router.post("/uploadAvatar", isLoggedIn, uploadAvatar);
router.get("/removeAvatar", isLoggedIn, removeAvatar);

//test route
router.post("/bulkUpload", bulkUpload);

module.exports = router;
