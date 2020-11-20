const express = require("express");
const router = express.Router();

//  import auth controller
const {
  requireLogin,
  adminMiddleware,
} = require("../controller/authController");
//  import controller
const {
  read,
  create,
  update,
  findAllPlayer,
  profilePicture,
  getProfilePicture,
  adminView,
  getProfile,
} = require("../controller/profileController");

// import validator to apply validation on profile route
const { profileValidator, filleUpload } = require("../validator/profile");
const { runValidation } = require("../validator");

// private router
router.get("/player/list", requireLogin, adminMiddleware, findAllPlayer);
router.get("/player/profile", requireLogin, read);
// get profile to display in the ranking
router.get("/get-profile/:id", getProfile);
router.get(
  "/player/profile-picture",
  requireLogin,
  adminMiddleware,
  profilePicture
);
router.post(
  "/player/profile/create",
  requireLogin,
  filleUpload.single("image"),
  profileValidator,
  runValidation,
  create
);
router.put(
  "/player/profile/update",
  requireLogin,
  filleUpload.single("image"),
  profileValidator,
  runValidation,
  update
);

router.get("/admin/profile", requireLogin, adminMiddleware, read);
router.get(
  "/admin/player/profile-admin-view/:id",
  requireLogin,
  adminMiddleware,
  adminView
);
router.post(
  "/admin/profile/create",
  requireLogin,
  adminMiddleware,
  filleUpload.single("image"),
  profileValidator,
  runValidation,
  create
);
router.put(
  "/admin/profile/update",
  requireLogin,
  adminMiddleware,
  filleUpload.single("image"),
  profileValidator,
  runValidation,
  update
);

module.exports = router;
