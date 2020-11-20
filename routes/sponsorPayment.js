const express = require("express");
const router = express.Router();

//  import auth controller
const {
  requireLogin,
  adminMiddleware,
} = require("../controller/authController");

//  import controller
const {
  findAllSponsorPaymentByDate,
  findOneSponsorPayment,
  findAllSponsorPayment,
  createSponsorPayment,
  updateSponsorPayment,
  deleteOneSponsorPayment,
  deleteAllSponsorPayment,
} = require("../controller/sponsorPaymentController");

// import validator to apply validation on profile route
const { sponsorPaymentValidator } = require("../validator/sponsorPayment");
const { runValidation } = require("../validator");

// find all sponsor payments
router.post(
  "/sponsor-payment/all-payment",
  requireLogin,
  adminMiddleware,
  findAllSponsorPaymentByDate
);
// find one
router.get(
  "/sponsor-payment/read/:id",
  requireLogin,
  adminMiddleware,
  findOneSponsorPayment
);
// find all
router.get(
  "/sponsor-payment/all/:id",
  requireLogin,
  adminMiddleware,
  findAllSponsorPayment
);
// create
router.post(
  "/sponsor-payment/create/:id",
  requireLogin,
  sponsorPaymentValidator,
  runValidation,
  adminMiddleware,
  createSponsorPayment
);
// update
router.put(
  "/sponsor-payment/update/:id",
  requireLogin,
  sponsorPaymentValidator,
  runValidation,
  adminMiddleware,
  updateSponsorPayment
);
// delete one
router.delete(
  "/sponsor-payment/delete/:id",
  requireLogin,
  adminMiddleware,
  deleteOneSponsorPayment
);
// delete all
router.delete(
  "/sponsor-payment/delete/all/:id",
  requireLogin,
  adminMiddleware,
  deleteAllSponsorPayment
);

module.exports = router;
