const mongoose = require("mongoose");

const ExpenseSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
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
      required: true,
      max: 50,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Expense", ExpenseSchema);
