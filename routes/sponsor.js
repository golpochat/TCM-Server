const express = require("express");
const router = express.Router();

//  import auth controller
const {
  requireLogin,
  adminMiddleware,
} = require("../controller/authController");

//  import controller
const {
  findOneSponsor,
  findAllSponsor,
  createSponsor,
  updateSponsor,
  deleteOneSponsor,
  deleteAllSponsor,
} = require("../controller/sponsorController");

// import validator to apply validation on profile route
const { sponsorValidator } = require("../validator/sponsor");
const { runValidation } = require("../validator");

// find one
router.get("/sponsor/read/:id", requireLogin, adminMiddleware, findOneSponsor);
// find all
router.get("/sponsor/list", requireLogin, adminMiddleware, findAllSponsor);
// create
router.post(
  "/sponsor/create",
  requireLogin,
  sponsorValidator,
  runValidation,
  adminMiddleware,
  createSponsor
);
// update
router.put(
  "/sponsor/update/:id",
  requireLogin,
  sponsorValidator,
  runValidation,
  adminMiddleware,
  updateSponsor
);
// delete one
router.delete(
  "/sponsor/delete/:id",
  requireLogin,
  adminMiddleware,
  deleteOneSponsor
);
// delete all
router.delete(
  "/sponsor/delete/all",
  requireLogin,
  adminMiddleware,
  deleteAllSponsor
);

module.exports = router;
