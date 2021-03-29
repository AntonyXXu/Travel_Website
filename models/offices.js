const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;

// To log the Mongoose errors to the console directly
db.on("error", console.error.bind(console, "connection error:"));

const officeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: "name is required",
    trim: true,
    lowercase: true,
  },
  email: {
    type: String,
    required: "emailAddress is required",
    lowercase: true,
    trim: true,
  },
  phone: {
    type: String,
    required: "Phone is required",
    lowercase: true,
    trim: true,
  },
  address: {
    type: String,
    required: "Address is required",
    trim: true,
  },
  location: {
    type: String,
    required: "Location is required",
    trim: true,
  },
  map: {
    type: String,
    required: "Map is required",
    trim: true,
  },
});

module.exports.office = mongoose.model("office", officeSchema);
