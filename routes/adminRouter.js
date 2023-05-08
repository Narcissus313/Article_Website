const express = require("express");
const router = express.Router();

const { getUsersList } = require("../controllers/adminControllers");

const { isLoggedIn } = require("../middlewares/auth/auth");

const { roleAc } = require("../middlewares/ac/ac");

router.get("/getUsersList", isLoggedIn, roleAc(["ADMIN"]), getUsersList);

// router.get("/test", isLoggedIn, roleAc(["ADMIN", "BLOGGER"]), test);

// router.get("/sample", isLoggedIn, roleAc(["BLOGGER"]), sample);

module.exports = router;
