const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      unique: true,
    },
    payments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "PlayerPayment",
      },
    ],
    first_name: {
      type: String,
      trim: true,
      required: true,
      max: 50,
    },
    last_name: {
      type: String,
      trim: true,
      required: true,
      max: 50,
    },
    address: {
      type: String,
      trim: true,
      required: true,
      max: 150,
    },
    contact_number: {
      type: String,
      trim: true,
      required: true,
      max: 15,
    },
    joining_year: {
      type: String,
    },
    image: {
      // data: Buffer,
      // contentType: String,
      type: String,
    },
    status: {
      type: String,
      enum: ["Available", "Not available", "Need a break"],
      default: "Available",
    },
    level: {
      type: String,
      default: "n/a",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Profile", ProfileSchema);
