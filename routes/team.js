const express = require("express");
const router = express.Router();

//  import auth controller
const {
  requireLogin,
  adminMiddleware,
} = require("../controller/authController");

//  import controller
const {
  findOneTeam,
  findAllTeam,
  createTeam,
  updateTeam,
  deleteOneTeam,
  deleteAllTeam,
} = require("../controller/teamController");

// import validator to apply validation on profile route
const { teamValidator } = require("../validator/team");
const { runValidation } = require("../validator");

// find one
router.get("/team/read/:id", requireLogin, adminMiddleware, findOneTeam);
// find all
router.get("/team/list", requireLogin, adminMiddleware, findAllTeam);
// create
router.post(
  "/team/create",
  requireLogin,
  teamValidator,
  runValidation,
  adminMiddleware,
  createTeam
);
// update
router.put(
  "/team/update/:id",
  requireLogin,
  teamValidator,
  runValidation,
  adminMiddleware,
  updateTeam
);
// delete one
router.delete("/team/delete/:id", requireLogin, adminMiddleware, deleteOneTeam);
// delete all
router.delete("/team/delete/all", requireLogin, adminMiddleware, deleteAllTeam);

module.exports = router;
