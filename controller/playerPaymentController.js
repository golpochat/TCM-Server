// loading models
const PlayerPayment = require("../model/PlayerPayment");
const Profile = require("../model/Profile");

// find all payment by date
exports.findAllPaymentByDate = (req, res) => {
  // console.log(req.body);
  const { startDate, endDate } = req.body;
  PlayerPayment.find({
    date: {
      $gte: new Date(new Date(startDate).setHours(00, 00, 00)),
      $lte: new Date(new Date(endDate).setHours(23, 59, 59)),
    },
  })
    .then((data) => {
      res.send(data);
      // console.log(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving player payment.",
      });
    });
};

// find all PlayerPayment
exports.findAllPlayerPayment = (req, res) => {
  PlayerPayment.find({ profile: req.params.id })
    // .populate("profile")
    // .populate("user")
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving PlayerPayment.",
      });
    });
};

// reading PlayerPayment
exports.findOnePlayerPayment = (req, res) => {
  const id = req.params.id;

  PlayerPayment.findOne({ _id: id })
    .then((data) => {
      if (!data)
        res
          .status(404)
          .send({ message: "Not found PlayerPayment with id: " + id });
      else res.send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error retrieving PlayerPayment with id: " + id });
    });
};

// create PlayerPayment
exports.createPlayerPayment = (req, res) => {
  const id = req.params.id;
  Profile.findOne({ _id: id }, (err, profile) => {
    if (err || !profile) {
      return res.status(404).json({
        error: "Player not found." + err,
      });
    }

    const playerPayment = new PlayerPayment({
      user: req.user,
      profile: profile,
      amount: req.body.amount,
      reference: req.body.reference,
      type: req.body.type,
      date: req.body.date,
    });

    // Save PlayerPayment in the database
    playerPayment
      .save(playerPayment)
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message ||
            "Some error occurred while creating the PlayerPayment.",
        });
      });
  });
};

// update PlayerPayment
exports.updatePlayerPayment = (req, res) => {
  console.log("REQUESTED DATA", req.body);
  const id = req.params.id;

  PlayerPayment.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update PlayerPayment with id: ${id}. Maybe PlayerPayment was not found!`,
        });
      } else res.send({ message: "PlayerPayment was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        error: err.message,
      });
    });
};

// delete one PlayerPayment
exports.deleteOnePlayerPayment = (req, res) => {
  const id = req.params.id;

  PlayerPayment.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete PlayerPayment with id=${id}. Maybe PlayerPayment was not found!`,
        });
      } else {
        res.send({
          message: "PlayerPayment was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};

// delete all PlayerPayment
exports.deleteAllPlayerPayment = (req, res) => {
  PlayerPayment.deleteMany({})
    .then((data) => {
      res.send({
        message: `${data.deletedCount} PlayerPayment were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while deleting all PlayerPayment.",
      });
    });
};
