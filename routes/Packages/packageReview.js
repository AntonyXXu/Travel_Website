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
  console.log(req.body);
  const newReview = new review({
    packageID: req.body.pkgID,
    rating: req.body.rating,
    reviewText: req.body.reviewText,
    userID: req.user._id,
  });
  newReview.save((err, result) => {
    if (err) return err;
    // Update reviews callback
    packages.findById({ _id: req.body.pkgID }, (err, result) => {
      if (err) return err;
      let newAvg =
        (result.averageRating * result.totalReviews +
          parseInt(req.body.rating)) /
        (result.totalReviews + 1);
      let total = result.totalReviews + 1;

      //callback fcn to update packages
      packages.findByIdAndUpdate(
        { _id: req.body.pkgID },
        { averageRating: newAvg, $inc: { totalReviews: +1 } },
        (err, result) => {
          if (err) return err;
          res.redirect("/packages/" + req.body.locationName);
        }
      );
    });
  });
});

router.post("/delete", function (req, res, next) {
  {
    res.redirect("/packages/" + req.body.locationName);
  }
});

module.exports = router;
