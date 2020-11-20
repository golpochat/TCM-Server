const mongoose = require("mongoose");

const PlayerPaymentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    profile: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Profile",
    },
    amount: {
      type: Number,
      default: 0,
    },
    date: {
      type: Date,
      default: Date.now(),
    },
    reference: {
      type: String,
      trim: true,
      required: true,
      max: 101,
    },
    type: {
      type: String,
      trim: true,
      required: true,
      max: 50,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("PlayerPayment", PlayerPaymentSchema);
