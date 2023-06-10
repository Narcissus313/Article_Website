const router = require("express").Router();

const { getUsersList } = require("../controllers/adminControllers");

const {isLoggedIn} = require("../../middlewares/auth/auth");

const { roleAc } = require("../../middlewares/ac/ac");

router.get("/getUsersList", isLoggedIn, roleAc(["ADMIN"]), getUsersList);

module.exports = router;
