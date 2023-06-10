const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const session = require("express-session");
const adminRouter = require("./users/routes");
const apiRouter = require("./users/routes/apiRouter");
const checkSystemAdminExists = require("./utils/checkSystemAdminExists");
const {
	showAllArticles,
	showArticlesSorted,
} = require("./users/controllers/articleController");

const app = express();

mongoose.connect("mongodb://127.0.0.1:27017/Blog88").then(() => {
	console.log("[+] DB Connected...");
});

checkSystemAdminExists();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(cookieParser());
const oneDay = 1000 * 60 * 60 * 24;
app.use(
	session({
		secret: "mySecrectKeyForAuthProject",
		saveUninitialized: true,
		cookie: { maxAge: oneDay },
		resave: false,
	})
);

app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminRouter);
app.use("/api", apiRouter);

app.get("/", (req, res) => {
	res.render("home", {
		userLoggedIn: !!req.session.user,
		userIsAdmin: req.session.user?.role === "ADMIN",
	});
});

app.get("/about", (_req, res) => {
	res.redirect("/");
});

app.get("/home", (_req, res) => {
	res.redirect("/");
});

app.post("/explore", showArticlesSorted);
app.get("/explore/pages/:page", showAllArticles);

app.all("*", function (req, res, _next) {
	res.render("pages/notFound", {
		userLoggedIn: res.locals.userStatus.userIsLoggedIn,
		userIsAdmin: res.locals.userStatus.userIsAdmin,
	});
});

// error handler
app.use(function (err, req, res, _next) {
	// set locals, only providing error in development
	res.locals.message = err.message;

	res.locals.error = req.app.get("env") === "development" ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render("error");
});

module.exports = app;
