var express = require("express");
var router = express.Router();
const { review } = require("../../models/reviews");
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
    });
    console.log(result.averageRating);
    console.log(result.totalReviews);
    console.log(result.reviews);
    result.save((err, result) => {
      if (err) return err;
      res.redirect("/packages/" + req.body.locationName);
    });
  });
});

router.post("/delete", function (req, res, next) {
  {
    res.redirect("/packages/" + req.body.locationName);
  }
});

module.exports = router;
