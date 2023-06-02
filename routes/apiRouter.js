const express = require("express");
const router = express.Router();
const userRouter = require("../routes/userRouter");
const articleRouter = require("../routes/articleRouter");

router.use("/users", userRouter);
router.use("/articles", articleRouter);

module.exports = router;
