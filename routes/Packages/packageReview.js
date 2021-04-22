var express = require("express");
var router = express.Router();
const { packages } = require("../../models/packages");

router.get("/", function (req, res, next) {
  {
    res.redirect("/packages/");
  }
});
router.get("/delete", function (req, res, next) {
  {
    res.redirect("/packages/");
  }
});

router.post("/", function (req, res, next) {
  packages.findById({ _id: req.body.pkgID }, (err, result) => {
    if (err) return err;
    result.averageRating =
      (result.averageRating * result.totalReviews + parseInt(req.body.rating)) /
      (result.totalReviews + 1);
    result.totalReviews += 1;
    result.reviews.push({
      packageID: req.body.pkgID,
      rating: req.body.rating,
      reviewText: req.body.reviewText,
      userID: req.user._id,
      username: req.user.username,
    });

    result.save((err, result) => {
      if (err) return err;
      res.redirect("/packages/" + req.body.locationName);
    });
  });
});

router.post("/delete", function (req, res, next) {
  if (req.body.userID != req.user._id) {
    return;
  }

  packages.findById({ _id: req.body.pkgID }, (err, pkgResult) => {
    if (err) return err;
    pkgResult.averageRating =
      (pkgResult.averageRating * pkgResult.totalReviews -
        parseInt(req.body.rating)) /
      (pkgResult.totalReviews - 1);
    pkgResult.totalReviews = pkgResult.totalReviews -= 1;
    pkgResult.reviews.id(req.body.reviewID).remove();

    pkgResult.save((err, result) => {
      if (err) return err;
      res.redirect("/packages/" + req.body.locationName);
    });
  });
});

module.exports = router;
