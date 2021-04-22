const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;

// To log the Mongoose errors to the console directly
db.on("error", console.error.bind(console, "connection error:"));

const reviewSchema = new mongoose.Schema({
  packageID: {
    type: String,
    required: "Package ID is required",
    trim: true,
  },
  userID: {
    type: String,
    required: "User ID is required",
    trim: true,
  },
  Rating: {
    type: Number,
    required: "Rating is required",
    trim: true,
    min: 1,
    max: 5,
  },
  Comments: {
    type: String,
    required: "Comments are required",
    trim: true,
  },
});

module.exports.review = mongoose.model("review", reviewSchema);
