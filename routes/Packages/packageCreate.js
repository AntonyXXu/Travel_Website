var express = require("express");
var router = express.Router();
const { packages } = require("../../models/packages");

//Go to create package page
router.get("/", function (req, res, next) {
  if (!req.user || !req.user.admin) {
    res.redirect("/account");
  } else {
    res.render("createPackage");
  }
});

//Save new package
router.post("/", function (req, res, next) {
  const newPackage = new packages({
    ...req.body,
    startDate: new Date(req.body.startDate),
    endDate: new Date(req.body.endDate),
    averageRating: 0,
    totalReview: 0,
  });
  newPackage.save((err, result) => {
    if (err) {
      {
        const errorArray = [];
        const errorKeys = Object.keys(err.errors);
        errorKeys.forEach((key) => errorArray.push(err.errors[key].message));
        return res.render("createPackage", {
          errors: errorArray,
          ...req.body,
        });
      }
    }
    res.render("createPackageComplete");
  });
});

module.exports = router;
