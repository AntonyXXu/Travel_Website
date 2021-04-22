var express = require("express");
var router = express.Router();
const { locations } = require("../../models/locations");
const { packages } = require("../../models/packages");
const purchasePackageRouter = require("./packagePurchase");
const createPackageRouter = require("./packageCreate");
const reviewPackageRouter = require("./packageReview");

/*Get Packages page. */
router.get("/", function (req, res, next) {
  locations.find({}, "bodyClass locationName picName", (err, result) => {
    if (err) return next(err);
    res.render("locations", {
      locations: result,
    });
  });
});

//Route purchase to packagePurchase file
router.use("/purchase", purchasePackageRouter);

//Route Create to packagePurchase file
router.use("/create", createPackageRouter);

router.use("/review", reviewPackageRouter);

router.get("/:locationName", async function (req, res, next) {
  //Find all packages in the specified location
  try {
    let pkgResult = await packages.find({
      locationName: req.params.locationName,
      endDate: { $gte: new Date() },
    });

    // if (err) return next(err);
    //Render the review results
    res.render("packages", {
      pkgLocationName: req.params.locationName,
      packages: pkgResult,
    });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
