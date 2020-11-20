const { check } = require("express-validator");

exports.matchDetailValidator = [
  check("run")
    .notEmpty()
    .withMessage("Run is required.")
    .isNumeric()
    .withMessage("Invalid input, numbers only."),
  check("wicket")
    .notEmpty()
    .withMessage("Number of wicket must be entered.")
    .isNumeric()
    .withMessage("Invalid input, numbers only."),
  check("match_fee")
    .notEmpty()
    .withMessage("Match fee must be needed.")
    .isNumeric()
    .withMessage("Invalid input, numbers only."),
];
