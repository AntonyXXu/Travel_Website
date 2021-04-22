var express = require("express");
var router = express.Router();
const { review } = require("../../models/reviews");

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
  {
    res.redirect("/packages/" + req.body.locationName);
  }
});

router.post("/delete", function (req, res, next) {
  {
    res.redirect("/packages/" + req.body.locationName);
  }
});

module.exports = router;
