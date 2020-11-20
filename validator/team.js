const { check } = require("express-validator");

exports.teamValidator = [
  check("name")
    .notEmpty()
    .withMessage("Team name is required.")
    .isLength({ max: 50 })
    .withMessage("Name of the team can be max 50 characters long."),
  check("level")
    .notEmpty()
    .withMessage("Team level is required.")
    .isLength({ max: 50 })
    .withMessage("Level of the team can be max 50 characters long."),
];
