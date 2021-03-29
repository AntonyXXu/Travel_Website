const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;

// To log the Mongoose errors to the console directly
db.on("error", console.error.bind(console, "connection error:"));

const contactSchema = new mongoose.Schema({
  area: {
    type: String,
    required: "name is required",
    trim: true,
    lowercase: true,
  },
  name: {
    type: String,
    required: "name is required",
    trim: true,
    lowercase: true,
  },
  title: {
    type: String,
    required: "Title is required",
    trim: true,
  },
  phone: {
    type: String,
    required: "phone number is required",
    trim: true,
  },
  emailAddress: {
    type: String,
    required: "emailAddress is required",
    lowercase: true,
    trim: true,
  },
  picName: {
    type: String,
    required: "Name of the picture is required",
    trim: true,
  },
  location: {
    type: String,
    required: "Location is required",
  },
});

module.exports.contact = mongoose.model("contact", contactSchema);
