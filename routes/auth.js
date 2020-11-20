const express = require("express");
const router = express.Router();

//  import controller
const {
  signup,
  activation,
  login,
  forgotPassword,
  resetPassword,
  googleLogin,
  facebookLogin,
} = require("../controller/authController");

// import validator to apply validation on signup route
const {
  userInputValidator,
  forgotPasswordValidator,
  resetPasswordValidator,
} = require("../validator/auth");
// writing index.js is optional
// const {runValidation} = require('../validator/index');
const { runValidation } = require("../validator");

router.post("/signup", userInputValidator, runValidation, signup);
router.post("/activation", activation);
router.post("/login", userInputValidator, runValidation, login);

// forgot password routes
router.put(
  "/forgot-password",
  forgotPasswordValidator,
  runValidation,
  forgotPassword
);
// reset password routes
router.put(
  "/reset-password",
  resetPasswordValidator,
  runValidation,
  resetPassword
);

// goolge routing
router.post("/google-login", googleLogin);
// facebook routing
router.post("/facebook-login", facebookLogin);

module.exports = router;
