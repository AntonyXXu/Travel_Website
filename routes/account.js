var express = require("express");
var router = express.Router();
const { User } = require("../models/account");
//const passport = require("passport");
const bcrypt = require("bcryptjs");
//const passportAuth = require("./PassportAuth/PassportAuth");

//Get Accounts page. If logged in, go to users
router.get("/", function (req, res, next) {
  if (req.user) {
    res.redirect("/users");
  } else {
    res.render("login");
  }
});

//get login page
router.get("/login", function (req, res, next) {
  if (req.user) {
    res.redirect("/users");
  } else {
    res.render("login", { errors: ["Incorrect username and password"] });
  }
});

//Get register page
router.get("/register", function (req, res, next) {
  res.render("register");
});

//Post Register. Save the new user, hash password
router.post("/register", function (req, res, next) {
  //password does not pass validation
  var pswdError = null;
  if (
    !/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/.test(
      req.body.password
    )
  ) {
    pswdError =
      "Password should have 1 lowercase letter, 1 uppercase letter, 1 number, 1 special character and be at least 8 characters.";
  }

  bcrypt.hash(req.body.password, 10, (err, hashPassword) => {
    if (err || pswdError) {
      {
        console.log(pswdError);
        const errorArray = [];
        if (pswdError) {
          errorArray.push(pswdError);
        }
        const errorKeys = Object.keys(err.errors);
        errorKeys.forEach((key) => errorArray.push(err.errors[key].message));
        return res.render("register", {
          errors: errorArray,
          ...req.body,
        });
      }
    }
    req.body.password = hashPassword;
    const newUser = new User(req.body);
    //save user
    newUser.save((err, result) => {
      if (err || pswdError) {
        {
          console.log(pswdError);
          const errorArray = [];
          if (pswdError) {
            errorArray.push(pswdError);
          }
          const errorKeys = Object.keys(err.errors);
          errorKeys.forEach((key) => errorArray.push(err.errors[key].message));
          return res.render("register", {
            errors: errorArray,
            ...req.body,
          });
        }
      }
      //immediately log in after registration
      req.login(newUser, function (err) {
        if (err) {
          return res.render("register", {
            errors: errorArray,
            ...req.body,
          });
        } else {
          return res.redirect("/users");
        }
      });
    });
  });
});

module.exports = router;
