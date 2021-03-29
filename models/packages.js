const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
require("dotenv").config();

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;

// To log the Mongoose errors to the console directly
db.on("error", console.error.bind(console, "connection error:"));

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
});

module.exports.packages = mongoose.model("packages", packageSchema);
