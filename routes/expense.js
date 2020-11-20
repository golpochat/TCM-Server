const express = require("express");
const router = express.Router();

//  import auth controller
const {
  requireLogin,
  adminMiddleware,
} = require("../controller/authController");

//  import controller
const {
  findOneExpense,
  findAllExpense,
  createExpense,
  updateExpense,
  deleteOneExpense,
  deleteAllExpense,
} = require("../controller/expenseController");

// import validator to apply validation on profile route
const { expenseValidator } = require("../validator/expense");
const { runValidation } = require("../validator");

// find one
router.get("/expense/read/:id", requireLogin, adminMiddleware, findOneExpense);
// find all
router.post("/expense/list", requireLogin, adminMiddleware, findAllExpense);
// create
router.post(
  "/expense/create",
  requireLogin,
  expenseValidator,
  runValidation,
  adminMiddleware,
  createExpense
);
// update
router.put(
  "/expense/update/:id",
  requireLogin,
  expenseValidator,
  runValidation,
  adminMiddleware,
  updateExpense
);
// delete one
router.delete(
  "/expense/delete/:id",
  requireLogin,
  adminMiddleware,
  deleteOneExpense
);
// delete all
router.delete(
  "/expense/delete/all",
  requireLogin,
  adminMiddleware,
  deleteAllExpense
);

module.exports = router;
