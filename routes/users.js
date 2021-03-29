var express = require("express");
var router = express.Router();
const { purchasedPackages } = require("../models/purchasedPackages");

//get users page
router.get("/", function (req, res, next) {
  if (req.user) {
    purchasedPackages.find({ userID: req.user._id }, (err, result) => {
      if (err) return next(err);
      res.render("users", {
        allPackages: result,
      });
    });
  } else {
    res.redirect("/account");
  }
});

module.exports = router;
