const express = require("express");
const router = express.Router();

//  import auth controller
const {
  requireLogin,
  adminMiddleware,
} = require("../controller/authController");

//  import controller
const {
  findOneTournament,
  findAllTournament,
  createTournament,
  updateTournament,
  deleteOneTournament,
  deleteAllTournament,
} = require("../controller/tournamentController");

// import validator to apply validation on profile route
const { tournamentValidator } = require("../validator/tournament");
const { runValidation } = require("../validator");

// find one
router.get(
  "/tournament/read/:id",
  requireLogin,
  adminMiddleware,
  findOneTournament
);
// find all
router.get(
  "/tournament/list",
  requireLogin,
  adminMiddleware,
  findAllTournament
);
// create
router.post(
  "/tournament/create",
  requireLogin,
  tournamentValidator,
  runValidation,
  adminMiddleware,
  createTournament
);
// update
router.put(
  "/tournament/update/:id",
  requireLogin,
  tournamentValidator,
  runValidation,
  adminMiddleware,
  updateTournament
);
// delete one
router.delete(
  "/tournament/delete/:id",
  requireLogin,
  adminMiddleware,
  deleteOneTournament
);
// delete all
router.delete(
  "/tournament/delete/all",
  requireLogin,
  adminMiddleware,
  deleteAllTournament
);

module.exports = router;
