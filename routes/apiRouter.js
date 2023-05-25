const express = require("express");
const router = express.Router();
// const multer = require("multer");
// const Article = require("../models/Article");
// const { join } = require("path");
// const fs = require("fs");

const validateArticleEntries = require("../utils/validationArticleEntries");
const { upload } = require("../utils/multer-article-pics-settings");
const { isLoggedIn } = require("../middlewares/auth/auth");
const {
	getUserArticles,
	addArticle,
	deleteArticle,
	updateArticle,
} = require("../controllers/userControllers");
const {
	getSingleArticle,
	uploadArticlePic,
} = require("../controllers/articleController");

//modal, pagination, protection, add article (done), summary in card, file size check in client side using formData entries,

router.get("/article/:articleId", getSingleArticle);
router.post("/articles", isLoggedIn, upload.single("pic"), addArticle);
router.post("/article/uploadPic/:articleId", uploadArticlePic);
router.get("/articles", isLoggedIn, getUserArticles);
router.delete("/articles/:articleId", isLoggedIn, deleteArticle);
router.patch(
	"/articles/:articleId",
	isLoggedIn,
	validateArticleEntries,
	updateArticle
);

module.exports = router;
