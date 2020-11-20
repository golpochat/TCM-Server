const { check } = require("express-validator");

exports.sponsorValidator = [
  check("name")
    .notEmpty()
    .withMessage("Name is required.")
    .isLength({ max: 50 })
    .withMessage("Name can be max 50 characters long."),
  check("address")
    .notEmpty()
    .withMessage("Address is required.")
    .isLength({ max: 150 })
    .withMessage("Address can be max 150 characters long."),
  check("contact_number")
    .notEmpty()
    .withMessage("Contact number is required.")
    .isLength({ max: 15 })
    .withMessage("Contact number can be max 15 digits long."),
  check("email")
    .notEmpty()
    .withMessage("Email is required.")
    .isEmail()
    .withMessage("Invalid email address."),
  check("year").notEmpty().withMessage("Year of joining must be selected."),
];
