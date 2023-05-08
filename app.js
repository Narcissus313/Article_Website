const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const session = require("express-session");

const userRouter = require("./routes/userRouter");
const adminRouter = require("./routes/adminRouter");

const app = express();

mongoose.connect("mongodb://127.0.0.1:27017/Blog88").then(() => {
	console.log("[+] DB connected..");
});

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
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

app.use("/user", userRouter);
app.use("/admin", adminRouter);

app.get("/", (req, res) => {
	res.render("home", { isLoggedIn: !!req.session.user });
});

app.get("/about", (req, res) => {
	res.redirect("/");
});

// catch 404 and forward to error handler
app.all("*", function (_req, res, next) {
	// next(createError(404));
	res.render("pages/notFound");
});

// error handler
app.use(function (err, req, res, _next) {
	// set locals, only providing error in development
	res.locals.message = err.message;

	// console.log('res.locals.message: ', res.locals.message);
	res.locals.error = req.app.get("env") === "development" ? err : {};

	// // render the error page
	res.status(err.status || 500);
	res.render("error");
});

module.exports = app;
