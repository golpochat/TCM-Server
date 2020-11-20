const mongoose = require("mongoose");

const SponsorSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    payments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SponsorPayment",
      },
    ],
    name: {
      type: String,
      trim: true,
      required: true,
      max: 50,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      lowercase: true,
    },
    address: {
      type: String,
      trim: true,
      required: true,
      max: 150,
    },
    year: {
      type: String,
      required: true,
    },
    status: {
      type: Number,
      default: 1,
    },
    contact_number: {
      type: String,
      trim: true,
      required: true,
      max: 15,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Sponsor", SponsorSchema);
