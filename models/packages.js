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
  username: {
    type: String,
    required: "User ID is required",
    trim: true,
  },
  rating: {
    type: Number,
    required: "Rating is required",
    trim: true,
    min: 1,
    max: 5,
  },
  reviewText: {
    type: String,
    trim: true,
  },
});

const packageSchema = new mongoose.Schema({
  locationName: {
    type: String,
    required: "Location name is required",
    trim: true,
  },
  detailedLocation: {
    type: String,
    required: "Detailed location is required",
    trim: true,
  },
  description: {
    type: String,
    required: "Description is required",
    trim: true,
  },
  basePrice: {
    type: Number,
    required: "Base price is required",
    trim: true,
  },
  agentCommission: {
    type: Number,
    required: "Agent commission is required",
    trim: true,
  },
  numberOfBookings: {
    type: Number,
    default: 0,
    trim: true,
  },
  startDate: {
    type: Date,
  },
  endDate: {
    type: Date,
  },
  picName: {
    type: String,
    required: "Name of the picture is required",
    trim: true,
  },
  averageRating: {
    type: Number,
    required: "Rating is required",
    trim: true,
    min: 0,
    max: 5,
    default: 0,
  },
  totalReviews: {
    type: Number,
    required: "Number of Reviews is required",
    trim: true,
    min: 0,
    default: 0,
  },
  reviews: [reviewSchema],
});

module.exports.packages = mongoose.model("packages", packageSchema);
