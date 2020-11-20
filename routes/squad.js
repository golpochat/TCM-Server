const express = require("express");
const router = express.Router();

//  import auth controller
const {
  requireLogin,
  adminMiddleware,
} = require("../controller/authController");

//  import controller
const {
  findOneSquad,
  findAllSquad,
  createSquad,
  updateSquad,
  deleteOneSquad,
  deleteAllSquad,
} = require("../controller/squadController");

// import validator to apply validation on profile route
const { squadValidator } = require("../validator/squad");
const { runValidation } = require("../validator");

// find one
router.get("/squad/read/:id", requireLogin, adminMiddleware, findOneSquad);
// find all
router.get("/squad/list", requireLogin, adminMiddleware, findAllSquad);
// create
router.post(
  "/squad/create/:id",
  requireLogin,
  squadValidator,
  runValidation,
  adminMiddleware,
  createSquad
);
// update
router.put(
  "/squad/update/:id",
  requireLogin,
  squadValidator,
  runValidation,
  adminMiddleware,
  updateSquad
);
// delete one
router.delete(
  "/squad/delete/:id",
  requireLogin,
  adminMiddleware,
  deleteOneSquad
);
// delete all
router.delete(
  "/squad/delete/all",
  requireLogin,
  adminMiddleware,
  deleteAllSquad
);

module.exports = router;
