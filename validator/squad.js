const { check } = require("express-validator");

exports.squadValidator = [
  // check("team").notEmpty().withMessage("Team must be selected."),
  // check("date").notEmpty().withMessage("Date must be selected."),
  // check("opponent").notEmpty().withMessage("Opponent name must be needed."),
  // check("profile").notEmpty().withMessage("Players must be picked."),
];
