var express = require("express");
var router = express.Router();
const { contact } = require("../models/contacts");
const { office } = require("../models/offices");

/* GET contacts page. */
router.get("/", function (req, res, next) {
  //query office database
  office.find({}, (err, result) => {
    //handle error
    if (err) return next(err);
    //else, if no error, check contact db
    contact.find({}, (err, result2) => {
      //error handling
      if (err) return next(err);
      //else render contacts page
      //pffices = result from above
      //contacts = result2 from here
      res.render("contacts", {
        pffices: result,
        contacts: result2,
      });
    });
  });
});

module.exports = router;
