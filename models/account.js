const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
require("dotenv").config();

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;

// To log the Mongoose erros to the console directly
db.on("error", console.error.bind(console, "connection error:"));

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: "Username is required",
    trim: true,
    unique: "The username must be unique.",
    lowercase: true,
  },
  fname: {
    type: String,
    required: "First Name is required",
    trim: true,
  },
  lname: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
    unique: "The email must be unique.",
    validate: {
      validator: function (v) {
        return /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})*$/.test(v);
      },
      message: (props) => `${props.value} is not a valid Email address.`,
    },
  },
  password: {
    type: String,
    required: "Please enter a password",
    trim: true,
    //No need for validator. The pswd is encrypted and is validated in the post router
  },
  Address: {
    type: String,
    trim: true,
  },
  Postal_Code: {
    type: String,
    required: "Please enter a Postal Code",
    trim: true,
    validate: {
      validator: function (v) {
        return /^(?!.*[DFIOQU])[A-VXY][0-9][A-Z] [0-9][A-Z][0-9]$/.test(v);
      },
      message: (props) => `Postal Code format: A1A 1A1`,
    },
  },
  City: {
    type: String,
    trim: true,
  },
  Province: {
    type: String,
    trim: true,
  },
  phone: {
    type: String,
    required: "Please enter a phone number",
    trim: true,

    validate: {
      validator: function (v) {
        return /^\(?([0-9]{3})\)?[-]([0-9]{3})[-]([0-9]{4})$/.test(v);
      },
      message: (props) => `Phone Number format: 000-000-0000`,
    },
  },
  admin: {
    type: Boolean,
    default: false,
  },
});

userSchema.plugin(uniqueValidator);

module.exports.User = mongoose.model("User", userSchema);
