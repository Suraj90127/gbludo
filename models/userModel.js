import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";

const userSchema = new mongoose.Schema({
  userId: {
    type: String,
  },
  name: {
    type: String,
  },
  phone: {
    type: Number,
  },
  otp: {
    type: String,
  },
  code: {
    type: String,
    default: "0",
  },
  // Adding password field
  password: {
    type: String,
    required: true, // Make it required for user authentication
    select: false, // Exclude password from query results by default
  },
  money: {
    type: Number,
    default: 0,
  },
  earning: {
    type: Number,
    default: 0,
    set: (v) => parseFloat(v).toFixed(2),
  },
  cashwon: {
    type: Number,
    default: 0,
  },
  referarning: {
    type: Number,
    default: 0,
  },
  battleplay: {
    type: Number,
    default: 0,
  },
  invite: {
    type: String,
    default: "ADMIN1",
  },
  user_level: {
    type: Number,
    default: 0,
  },
  role: {
    type: String,
    default: "user",
  },
  status: {
    type: String,
    default: "0",
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
  token: {
    type: String,
  },
});

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Generate JWT token
userSchema.methods.getJWTToken = function () {
  const token = jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
  this.token = token;
  this.save(); // Save the token to the database
  return token;
};

// Compare password method
userSchema.methods.comparePassword = async function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

// Generate and hash reset password token
userSchema.methods.getResetPasswordToken = function () {
  // Generate reset token
  const resetToken = crypto.randomBytes(20).toString("hex");

  // Hash and set resetPasswordToken
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  // Set resetPasswordExpire to 15 minutes from now
  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
  return resetToken;
};

export default mongoose.model("user", userSchema);
