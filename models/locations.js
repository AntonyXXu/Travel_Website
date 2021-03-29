const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;

// To log the Mongoose errors to the console directly
db.on("error", console.error.bind(console, "connection error:"));

const locationSchema = new mongoose.Schema({
  bodyClass: {
    type: String,
    required: "Location Class is required. It can be america, asia, or europe",
    trim: true,
    lowercase: true,
  },
  link: {
    type: String,
    required: "Link directory is required",
    trim: true,
  },
  locationName: {
    type: String,
    required: "Location name is required",
    trim: true,
  },
  picName: {
    type: String,
    required: "Name of the picture is required",
    trim: true,
  },
});

module.exports.locations = mongoose.model("Locations", locationSchema);
