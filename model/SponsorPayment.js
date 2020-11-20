const mongoose = require("mongoose");

const SponsorPaymentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    sponsor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Sponsor",
    },
    amount: {
      type: Number,
      required: true,
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
      max: 150,
    },
    type: {
      type: String,
      trim: true,
      default: "Cash",
      max: 50,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("SponsorPayment", SponsorPaymentSchema);
