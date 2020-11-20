const multer = require("multer");
const { check } = require("express-validator");

exports.profileValidator = [
  check("first_name")
    .notEmpty()
    .withMessage("First name is required.")
    .isLength({ max: 50 })
    .withMessage("First name can be max 50 characters long."),
  check("last_name")
    .notEmpty()
    .withMessage("Last name is required.")
    .isLength({ max: 50 })
    .withMessage("Last name can be max 50 characters long."),
  check("image")
    .notEmpty()
    .withMessage("A picture for the profile must be needed."),
  check("address")
    .notEmpty()
    .withMessage("Address is required.")
    .isLength({ max: 150 })
    .withMessage("Address can be max 150 characters long."),
  check("contact_number")
    .notEmpty()
    .withMessage("Contact number is required.")
    .isLength({ max: 15 })
    .withMessage("Contact number can be max 15 characters long."),
  check("joining_year")
    .notEmpty()
    .withMessage("Year of joining must be selected."),
  check("level")
    .notEmpty()
    .withMessage("Level of professionalism must be selected."),
];

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpg": "jpg",
  "image/jpeg": "jpeg",
};
exports.filleUpload = multer({
  // file size 2MB max
  limits: 2097152,
  storage: multer.diskStorage({
    destination: (req, res, cb) => {
      cb(null, "uploads/images");
    },
    filename: (req, file, cb) => {
      const ext = MIME_TYPE_MAP[file.mimetype];
      console.log(ext);
      cb(null, req.user._id + "." + ext);
    },
  }),
  fileFilter: (req, file, cb) => {
    console.log(file);
    const isValid = !!MIME_TYPE_MAP[file.mimetype];
    let error = isValid
      ? null
      : { error: "Unknown file type jpg/jpeg/png  file is accepted. " };

    cb(error, isValid);
  },
});
