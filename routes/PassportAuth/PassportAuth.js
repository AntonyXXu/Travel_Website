var express = require("express");
var router = express.Router();
const passport = require("passport");
const bcrypt = require("bcryptjs");
const LocalStrategy = require("passport-local").Strategy;
const { User } = require("../../models/account");

//Define auth variable for passport
const auth = {
  secret: process.env.PASSPORT_SECRET,
  resave: true,
  saveUninitialized: true,
};

// check existing session login
module.exports.session = auth;
module.exports.isAuth = function (req, res, next) {
  if (req.isAuthenticated()) next();
  else return false;
};

module.exports.init = function (app) {
  //check login username and password
  passport.use(
    new LocalStrategy((username, password, done) => {
      User.findOne({ username: username }, (err, user) => {
        if (err) return done(err);
        else if (!user) {
          return done(null, false);
        } else {
          bcrypt.compare(password, user.password, (err, res) => {
            if (res) {
              return done(null, user);
            } else {
              return done(null, false, { errors: "Incorrect password" });
            }
          });
        }
      });
    })
  );
  //serialize and deserialize user
  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });
  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });

  //Initialize session
  app.use(passport.initialize());
  app.use(passport.session());

  //check log in
  app.post(
    "/account/login",
    passport.authenticate("local", {
      successRedirect: "/users/",
      failureRedirect: "/account/login",
    })
  );

  //save local user variables
  app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    next();
  });

  //log out
  app.get("/log-out", (req, res) => {
    req.logout();
    res.redirect("/");
  });
};

//module.exports = router;
