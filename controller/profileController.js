// loading user model
const Profile = require("../model/Profile");
const User = require("../model/User");
// const formidable = require("formidable");
// const fs = require("fs");

// find all Registration
exports.findAllPlayer = (req, res) => {
  Profile.find()
    .populate("user", { role: "player" })
    .then((data) => {
      if (!data)
        res
          .status(404)
          .send({ message: "Not found Registration with id: " + id });
      else res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Registration.",
      });
    });
};

// reading user profile
exports.read = (req, res) => {
  Profile.findOne({ user: req.user._id })
    .populate("user", ["name", "email", "role"])
    .then((profile) => {
      if (!profile) {
        console.log(profile);
        return res.status(404).json({
          error: "User has not been created his/her profile yet.",
        });
      }
      res.json(profile);
    })
    .catch((error) => {
      console.log("error: " + error);
      return res.json({
        error: "Something went wrong, try again later.",
      });
    });
};

// get profile by id
exports.getProfile = (req, res) => {
  const id = req.params.id;
  Profile.findById(id)
    .select("first_name last_name")
    .then((profile) => {
      res.json(profile);
    })
    .catch();
};

// reading user profile
exports.adminView = (req, res) => {
  const id = req.params.id;
  Profile.findById(id)
    .populate("user", ["name", "email", "role"])
    .then((profile) => {
      if (!profile) {
        return res.status(404).json({
          error: "User profile was not found.",
        });
      }
      res.json(profile);
    })
    .catch((error) => {
      console.log("error: " + error);
      return res.status(500).json({
        error: "Something went wrong, try again later.",
      });
    });
};

exports.profilePicture = (req, res, next) => {
  if (req.profile.profile_picture.data) {
    res.set(("Content-Type", req.profile.profile_picture.contentType));
    return res.send(req.profile.profile_picture.data);
  }
  next();
};
exports.getProfilePicture = (req, res) => {
  res.set("Content-Type", req.profile.image.contentType);
  return res.send(req.profile.image.data);
};

// create user profile without profile picture
exports.create = (req, res) => {
  // console.log(req.body);
  User.findOne({ _id: req.user._id }, (err, user) => {
    if (err || !user) {
      return res.status(404).json({
        error: "User not found.",
      });
    }
    const profileFields = {};
    profileFields.user = user;
    profileFields.first_name = req.body.first_name;
    profileFields.last_name = req.body.last_name;
    profileFields.address = req.body.address;
    profileFields.contact_number = req.body.contact_number;
    profileFields.joining_year = new Date(req.body.joining_year).getFullYear();
    profileFields.level = req.body.level;
    profileFields.status = req.body.status;
    profileFields.image = req.file.filename;
    console.log(profileFields);
    new Profile(profileFields)
      .save()
      .then((profile) => {
        if (!profile) {
          console.log(profile);
          return res.status(404).json({
            error: "User profile could not be created, please try again later.",
          });
        }
        res.json(profile);
      })
      .catch((error) => {
        console.log(error);
        res.json({
          error: "Something went wrong, try again later.",
        });
      });
  });
};

// updating user profile
exports.update = (req, res) => {
  console.log("UPDATE PROFILE", req.user, "UPDATE DATA", req.body);
  // const { first_name, last_name,address,contact_number,joining_year,level } = req.body;

  Profile.findOne({ user: req.user._id }, (err, profile) => {
    if (err || !profile) {
      return res.status(404).json({
        error: "Invalid usr id, contact to admin.",
      });
    }

    profile.first_name = req.body.first_name;
    profile.last_name = req.body.last_name;
    profile.address = req.body.address;
    profile.contact_number = req.body.contact_number;
    profile.joining_year = new Date(req.body.joining_year).getFullYear();
    profile.level = req.body.level;
    profile.status = req.body.status;
    // if (req.file.filename !== "") profile.image = req.file.filename;

    profile.save((err, updatedProfile) => {
      if (err) {
        console.log("PROFILE UPDATING ERROR");
        return res.status(400).json({
          error: "Error in updatting profile, try again",
        });
      }
      res.json(updatedProfile);
    });
  });
};
