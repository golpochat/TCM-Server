const express = require("express");
const router = express.Router();

//  import auth controller
const {
  requireLogin,
  adminMiddleware,
} = require("../controller/authController");

//  import controller
const {
  findOneMatch,
  findAllMatch,
  createMatch,
  updateMatch,
  deleteOneMatch,
  deleteAllMatch,
  createMultipleMatches,
  findAllMatchByTournament,
  findAllMatchByTeam,
} = require("../controller/matchController");

// import validator to apply validation on profile route
const { matchValidator } = require("../validator/match");
const { runValidation } = require("../validator");

// find one
router.get("/match/read/:id", requireLogin, adminMiddleware, findOneMatch);
// find all
router.get("/match/list", requireLogin, adminMiddleware, findAllMatch);
// find all matches by tournament
router.get(
  "/match/list-by-tournament/:id",
  requireLogin,
  adminMiddleware,
  findAllMatchByTournament
);
// find all matches by team
router.get(
  "/match/list-by-team/:id",
  requireLogin,
  adminMiddleware,
  findAllMatchByTeam
);
// create
router.post(
  "/match/create",
  requireLogin,
  matchValidator,
  runValidation,
  adminMiddleware,
  createMatch
);
// create multiple
router.post(
  "/match/create-multiple",
  requireLogin,
  matchValidator,
  runValidation,
  adminMiddleware,
  createMultipleMatches
);
// update
router.put(
  "/match/update/:id",
  requireLogin,
  matchValidator,
  runValidation,
  adminMiddleware,
  updateMatch
);
// delete one
router.delete(
  "/match/delete/:id",
  requireLogin,
  adminMiddleware,
  deleteOneMatch
);
// delete all
router.delete(
  "/match/delete/all",
  requireLogin,
  adminMiddleware,
  deleteAllMatch
);

module.exports = router;
