const { check } = require("express-validator");

exports.matchValidator = [
  check("duration")
    .notEmpty()
    .withMessage("Duration of the match is required.")
    .isNumeric()
    .withMessage("Invalid input, numbers only."),
  check("run")
    .notEmpty()
    .withMessage("Total run required.")
    .isNumeric()
    .withMessage("Invalid input, numbers only."),
  check("result")
    .notEmpty()
    .withMessage("Result must be selected.")
    .isLength({ max: 50 })
    .withMessage("Result can be max 50 characters long."),
  check("umpire")
    .notEmpty()
    .withMessage("Umpire type must be selected.")
    .isLength({ max: 50 })
    .withMessage("Type of umpire can be max 50 characters long."),
  check("tournament")
    .notEmpty()
    .withMessage("Tournament name must be selected."),
  check("team").notEmpty().withMessage("Team name type must be selected."),
];
