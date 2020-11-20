const mongoose = require("mongoose");

const TeamSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    name: {
      type: String,
      trim: true,
      required: true,
      max: 50,
    },
    year: {
      type: String,
    },
    level: {
      type: String,
      max: 50,
    },
    status: {
      type: Number,
      default: 1,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Team", TeamSchema);
