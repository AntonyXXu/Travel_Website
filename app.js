const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
var expressSession = require("express-session");

// routers
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const contactsRouter = require("./routes/contacts");
const packagesRouter = require("./routes/Packages/packages");
const loginRouter = require("./routes/account");
// passport authentification
const passportAuth = require("./routes/PassportAuth/PassportAuth");

const app = express();

// app initialization
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(passportAuth.session.secret));

// view engine setup to PUG templates
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// passport initialization
app.use(expressSession(passportAuth.session));
passportAuth.init(app);

// router initialization
app.use("/", indexRouter);
app.use("/home", indexRouter);
app.use("/users", usersRouter);
app.use("/contact", contactsRouter);
app.use("/packages", packagesRouter);
app.use("/account", loginRouter);

// apply public files
app.use(express.static(path.join(__dirname, "public")));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
