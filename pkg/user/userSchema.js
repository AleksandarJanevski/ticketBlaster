const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    validate: [
      validator.isStrongPassword,
      "Please provide a stronger password",
    ],
  },
  picture: {
    type: String,
    default: "default.png",
  },
  purchaseHistory: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "event",
    },
  ],
  payment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "payment",
  },
  passwordResetToken: String,
  passwordResetExpire: Date,
  verifyToken: String,
  verified: {
    type: Boolean,
    default: false,
  },
  deleted: {
    type: Boolean,
    default: false,
  },
});
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
