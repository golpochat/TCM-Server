const express = require("express");
const router = express.Router();

//  import auth controller
const {
  requireLogin,
  adminMiddleware,
} = require("../controller/authController");

//  import controller
const {
  findAllPaymentByDate,
  findOnePlayerPayment,
  findAllPlayerPayment,
  createPlayerPayment,
  updatePlayerPayment,
  deleteOnePlayerPayment,
  deleteAllPlayerPayment,
} = require("../controller/playerPaymentController");

// import validator to apply validation on profile route
const { playerPaymentValidator } = require("../validator/playerPayment");
const { runValidation } = require("../validator");

// find all player payments
router.post(
  "/player-payment/all-payment",
  requireLogin,
  adminMiddleware,
  findAllPaymentByDate
);
// find one
router.get(
  "/player-payment/read/:id",
  requireLogin,
  // adminMiddleware,
  findOnePlayerPayment
);
// find all
router.get(
  "/player-payment/list/:id",
  requireLogin,
  // adminMiddleware,
  findAllPlayerPayment
);
// create
router.post(
  "/player-payment/create/:id",
  requireLogin,
  playerPaymentValidator,
  runValidation,
  adminMiddleware,
  createPlayerPayment
);
// update
router.put(
  "/player-payment/update/:id",
  requireLogin,
  playerPaymentValidator,
  runValidation,
  adminMiddleware,
  updatePlayerPayment
);
// delete one
router.delete(
  "/player-payment/delete/:id",
  requireLogin,
  adminMiddleware,
  deleteOnePlayerPayment
);
// delete all
router.delete(
  "/player-payment/delete/all/:id",
  requireLogin,
  adminMiddleware,
  deleteAllPlayerPayment
);

module.exports = router;
