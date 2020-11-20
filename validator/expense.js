const { check } = require("express-validator");

exports.expenseValidator = [
  check("amount")
    .notEmpty()
    .withMessage("Amount is required.")
    .isNumeric()
    .withMessage("Invalid input, numbers only."),
  check("reference")
    .notEmpty()
    .withMessage("Reference is required.")
    .isLength({ max: 150 })
    .withMessage("Reference can be max 150 characters long."),
  check("type")
    .notEmpty()
    .withMessage("Payment type is required.")
    .isLength({ max: 50 })
    .withMessage("Payment type can be max 50 characters long."),
];
