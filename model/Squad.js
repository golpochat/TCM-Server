const mongoose = require("mongoose");

const SquadSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    team: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
    },
    match: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Match",
    },
    profile: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Profile",
      },
    ],
    // date: {
    //   type: String,
    //   default: Date.now(),
    // },
    status: {
      type: String,
      enum: ["playing", "reserved"],
      default: "playing",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Squad", SquadSchema);
