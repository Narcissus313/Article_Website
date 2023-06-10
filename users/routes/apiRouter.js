const router = require("express").Router();
const userRouter = require("./userRouter");
const articleRouter = require("./articleRouter");
const commentRouter = require("./commentRouter");
const setUserStatus = require("../../utils/setUserStatus");



router.use(setUserStatus);

router.use("/users", userRouter);
router.use("/articles", articleRouter);
router.use("/comments", commentRouter);

module.exports = router;
