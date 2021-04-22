var express = require("express");
var router = express.Router();
const { purchasedPackages } = require("../../models/purchasedPackages");
const { packages } = require("../../models/packages");

//Render purchase page with pkg data
router.post("/", function (req, res, next) {
  //check if user is logged in
  if (req.user) {
    //render page with params
    res.render("packagePurchase", {
      pkgID: req.body.pkgID,
      detailedLocation: req.body.detailedLocation,
      pkgBasePrice: req.body.pkgBasePrice,
      pkgAgentPrice: req.body.pkgAgentPrice,
    });
  } else {
    res.redirect("/account");
  }
});

//Confirm purchase with numberBooked
router.post("/confirmation", function (req, res, next) {
  if (req.user) {
    res.render("packagePurchase", {
      pkgID: req.body.pkgID,
      detailedLocation: req.body.detailedLocation,
      pkgBasePrice: req.body.pkgBasePrice,
      pkgAgentPrice: req.body.pkgAgentPrice,
      numberBooked: req.body.numberBooked,
    });
  } else {
    res.redirect("/account");
  }
});

//Complete purchase with saved data.
router.post("/complete", function (req, res, next) {
  //Create new Schema
  const newPurchasedPackage = new purchasedPackages({
    userID: req.user._id,
    packageID: req.body.pkgID,
    numberBooked: req.body.numberBooked,
    totalCost: req.body.totalCost,
    detailedLocation: req.body.detailedLocation,
  });
  //Save new schema
  newPurchasedPackage.save((err, result) => {
    if (err) {
      {
        const errorArray = [];
        const errorKeys = Object.keys(err.errors);
        errorKeys.forEach((key) => errorArray.push(err.errors[key].message));
        return res.render("packagePurchase", {
          errors: errorArray,
          ...req.body,
        });
      }
    }
    //Update packages database for numberBooked
    packages.findByIdAndUpdate(
      { _id: req.body.pkgID },
      { $inc: { numberOfBookings: +req.body.numberBooked } },
      (err, result) => {
        if (err) {
          const errorArray = [];
          const errorKeys = Object.keys(err.errors);
          errorKeys.forEach((key) => errorArray.push(err.errors[key].message));
          return res.render("packagePurchase", {
            errors: errorArray,
            ...req.body,
          });
        }
        //if save complete, go to complete page
        return res.render("packagePurchaseComplete", req.body);
      }
    );
  });
});

module.exports = router;
