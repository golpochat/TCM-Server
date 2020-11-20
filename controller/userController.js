// loading model
const User = require("../model/User");

// reading user
exports.findOneUser = (req, res) => {
  const userId = req.params.id;
  User.findById(userId).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User not found.",
      });
    }
    user.hashed_password = undefined;
    user.salt = undefined;
    res.json(user);
  });
};

// updating user
exports.updateUser = (req, res) => {
  console.log("UPDATE USER - req.user", req.user, "UPDATE DATA", req.body);
  const { password, confirm_password } = req.body;
  console.log(req.body);
  User.findOne({ _id: req.user._id }, (err, user) => {
    if (err || !user) {
      return res.status(404).json({
        error: "User not found.",
      });
    }

    // if password does not match
    if (password !== confirm_password) {
      return res.status(400).json({
        error: "Password & confirm-password don't match.",
      });
    }
    user.password = password;

    user.save((err, updateUser) => {
      if (err) {
        console.log("PASSWORD UPDATING ERROR");
        return res.status(400).json({
          error: "Error in updatting password, try again",
        });
      }
      updateUser.hashed_password = undefined;
      updateUser.salt = undefined;
      res.json(updateUser);
    });
  });
};

// updating user
exports.userActivation = (req, res) => {
  console.log("UPDATE USER - req.user", req.user, "UPDATE DATA", req.body);
  const status = req.body;
  const id = req.params.id;
  User.findByIdAndUpdate(id, status, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update User with id: ${id}. Maybe User was not found!`,
        });
      } else res.send({ message: "User was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        error: err.message,
      });
    });
};

// find all users

exports.findAllUser = (req, res) => {
  User.find()
    .then((users) => {
      if (!users) {
        console.log("No user found");
        return res.status(404).json({
          error: "User not found.",
        });
      }
      res.json(users);
    })
    .catch((error) => {
      console.log("Error");
      res.json({
        error: "There is no user to be found.",
      });
    });
};
