const mongoose = require("mongoose");
// const MatchDetail = mongoose.modelNames("MatchDetail");
const MatchSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    team: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
    },
    tournament: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tournament",
    },
    squad: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Squad",
    },
    // matchDetail: MatchDetail,
    opponent: {
      type: String,
      trim: true,
      required: true,
      max: 100,
      default: "tba",
    },
    match_no: {
      type: Number,
      required: true,
      default: 0,
    },
    duration: {
      type: Number,
      required: true,
      default: 20,
    },
    run: {
      type: Number,
      required: true,
      default: 0,
    },
    result: {
      type: String,
      required: true,
      enum: ["won", "lost", "drawn", "no result", "abandoned", "tbp"],
      default: "tbp",
    },
    umpire: {
      type: String,
      required: true,
      enum: ["official", "unofficial"],
      default: "unofficial",
    },
    date: {
      type: Date,
      default: Date.now(),
    },
    status: {
      type: Number,
      default: 1,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Match", MatchSchema);
