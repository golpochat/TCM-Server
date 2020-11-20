const mongoose = require("mongoose");

const MatchDetailSchema = new mongoose.Schema(
  {
    match: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Match",
    },
    profile: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Profile",
    },
    run: {
      type: Number,
      default: 0,
    },
    wicket: {
      type: Number,
      default: 0,
    },
    match_fee: {
      type: Number,
      default: 5,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("MatchDetail", MatchDetailSchema);
