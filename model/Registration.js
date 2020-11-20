const mongoose = require("mongoose");

const RegistrationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    profile: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Profile",
    },
    note: {
      type: String,
      trim: true,
      max: 255,
    },
    year_of_registration: {
      type: String,
      default: new Date().getFullYear(),
    },
    fee: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ["registered", "unregistered", "pending"],
      defaultStatus: "unregistered",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Registration", RegistrationSchema);
