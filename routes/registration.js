const express = require("express");
const router = express.Router();

//  import auth controller
const {
  requireLogin,
  adminMiddleware,
} = require("../controller/authController");

//  import controller
const {
  findOneRegistration,
  findAllRegistration,
  createRegistration,
  updateRegistration,
  deleteOneRegistration,
  deleteAllRegistration,
  isRegistered,
  findAllRegistrationPayment,
} = require("../controller/registrationController");

// import validator to apply validation on profile route
const { registrationValidator } = require("../validator/registration");
const { runValidation } = require("../validator");

// registraion checking
router.get("/registration/is-registered/:id", requireLogin, isRegistered);
// find one
router.get("/registration/read/:id", requireLogin, findOneRegistration);
// find all
router.get(
  "/registration/list",
  requireLogin,
  adminMiddleware,
  findAllRegistration
);
// find all payment
router.get(
  "/registration/payment-list/:id",
  requireLogin,
  // adminMiddleware,
  findAllRegistrationPayment
);
// create
router.post(
  "/registration/create/:id",
  requireLogin,
  registrationValidator,
  runValidation,
  createRegistration
);
// update
router.put(
  "/registration/update/:id",
  requireLogin,
  registrationValidator,
  runValidation,
  adminMiddleware,
  updateRegistration
);
// delete one
router.delete(
  "/registration/delete/:id",
  requireLogin,
  adminMiddleware,
  deleteOneRegistration
);
// delete all
router.delete(
  "/registration/delete/all",
  requireLogin,
  adminMiddleware,
  deleteAllRegistration
);

module.exports = router;
