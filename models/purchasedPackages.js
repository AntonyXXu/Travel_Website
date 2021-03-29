const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;

// To log the Mongoose errors to the console directly
db.on("error", console.error.bind(console, "connection error:"));

const purchasedPackagesSchema = new mongoose.Schema({
  userID: {
    type: String,
    required: "User Must be logged in",
    trim: true,
  },
  packageID: {
    type: String,
    required: "Package must be selected",
    trim: true,
  },
  numberBooked: {
    type: Number,
    required: "Number booked is required",
    trim: true,
  },
  totalCost: {
    type: Number,
    required: "Cost of package is required",
    trim: true,
  },
  detailedLocation: {
    type: String,
    required: "Location Name is required",
    trim: true,
  },
});

module.exports.purchasedPackages = mongoose.model(
  "purchasedPackages",
  purchasedPackagesSchema
);
