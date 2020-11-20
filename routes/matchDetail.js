const express = require("express");
const router = express.Router();

//  import auth controller
const {
  requireLogin,
  adminMiddleware,
} = require("../controller/authController");

//  import controller
const {
  findOneMatchDetail,
  overallRanking,
  createMatchDetail,
  updateMatchDetail,
  deleteOneMatchDetail,
  deleteAllMatchDetail,
  findAllMatchDetailByMatchId,
  findAllMatchFee,
  findAllMatchDetailByPlayerId,
} = require("../controller/matchDetailController");

// import validator to apply validation on profile route
const { matchDetailValidator } = require("../validator/matchDetail");
const { runValidation } = require("../validator");

// find one
router.get(
  "/match-detail/read/:id",
  requireLogin,
  adminMiddleware,
  findOneMatchDetail
);
// find all by match_id
router.get(
  "/match-detail/MatchById/:id",
  requireLogin,
  adminMiddleware,
  findAllMatchDetailByMatchId
);
// find all
router.get(
  "/match-detail/all",
  // requireLogin,
  // adminMiddleware,
  overallRanking
);

// for ranking by profile id
router.get(
  "/match-detail/ranking-by-profile/:id",
  requireLogin,
  // adminMiddleware,
  overallRanking
);
// find all fees by id
router.get(
  "/match-detail/fee-list/:id",
  requireLogin,
  // adminMiddleware,
  findAllMatchDetailByPlayerId
);

// find all fees by player id
router.get(
  "/match-detail/fee-by-player/:id",
  requireLogin,
  // adminMiddleware,
  findAllMatchDetailByPlayerId
);

// create
router.post(
  "/match-detail/create/:id",
  requireLogin,
  matchDetailValidator,
  runValidation,
  adminMiddleware,
  createMatchDetail
);
// update
router.put(
  "/match-detail/update/:id",
  requireLogin,
  matchDetailValidator,
  runValidation,
  adminMiddleware,
  updateMatchDetail
);
// delete one
router.delete(
  "/match-detail/delete/:id",
  requireLogin,
  adminMiddleware,
  deleteOneMatchDetail
);
// delete all
router.delete(
  "/match-detail/delete/all",
  requireLogin,
  adminMiddleware,
  deleteAllMatchDetail
);

module.exports = router;
