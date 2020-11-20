const express = require("express");
const router = express.Router();

//  import controller
const {
  findOneUser,
  findAllUser,
  updateUser,
  userActivation,
} = require("../controller/userController");
const {
  requireLogin,
  adminMiddleware,
} = require("../controller/authController");
const { changePasswordValidator } = require("../validator/auth");
const { runValidation } = require("../validator");

router.get("/user/list", requireLogin, adminMiddleware, findAllUser);
router.get("/user/read/:id", requireLogin, findOneUser);
router.put(
  "/player/user/update",
  requireLogin,
  changePasswordValidator,
  runValidation,
  updateUser
);
router.put(
  "/admin/user/update/:id",
  requireLogin,
  // changePasswordValidator,
  // runValidation,
  adminMiddleware,
  userActivation
);

module.exports = router;
