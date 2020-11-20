const { check } = require("express-validator");

exports.tournamentValidator = [
  check("name")
    .notEmpty()
    .withMessage("Tournament name is required.")
    .isLength({ max: 50 })
    .withMessage("Name can be max 50 characters long."),
  check("year")
    .notEmpty()
    .withMessage("Year of the tournament must be entered."),
];
