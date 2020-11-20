const { check } = require("express-validator");

exports.registrationValidator = [
  check("note")
    // .notEmpty()
    // .withMessage("First name is required.")
    .isLength({ max: 255 })
    .withMessage("Note can be max 255 characters long."),
  // check("fee")
  //   .notEmpty()
  //   .withMessage("Fee is required.")
  //   .isNumeric()
  //   .withMessage("Numbers only."),
  // check("year_of_registration")
  //   .notEmpty()
  //   .withMessage("Year of registration must be selected."),
];
