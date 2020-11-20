// loading models
const Squad = require("../model/Squad");
const Match = require("../model/Match");

// find all Squad
exports.findAllSquad = (req, res) => {
  console.log(req.body);
  Squad.find({})
    .populate("match")
    .populate("profile")
    .populate("team")
    .sort({ date: 1 })
    .then((data) => {
      res.send(data);
      console.log(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Squad.",
      });
    });
};

// reading Squad by match id
exports.findOneSquad = (req, res) => {
  const id = req.params.id;
  console.log(id);
  Squad.findOne({ match: id })
    .populate("match")
    .populate("profile")
    .populate("team")
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found Squad with id: " + id });
      else res.send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error retrieving Squad with id: " + id });
    });
};
// reading Squad
// exports.findOneSquad = (req, res) => {
//   const id = req.params.id;

//   Squad.findById(id)
//     .then((data) => {
//       if (!data)
//         res.status(404).send({ message: "Not found Squad with id: " + id });
//       else res.send(data);
//     })
//     .catch((err) => {
//       res
//         .status(500)
//         .send({ message: "Error retrieving Squad with id: " + id });
//     });
// };

// create Squad
exports.createSquad = (req, res) => {
  // console.log(req.body);
  const matchID = req.params.id;

  const squadFields = {};
  squadFields.user = req.user;
  squadFields.team = req.body.team;
  squadFields.match = matchID;
  // squadFields.date = req.body.date;
  squadFields.status = req.body.status;
  squadFields.profile = {};
  squadFields.profile = req.body.profile;

  const squad = new Squad(squadFields);

  // Save Squad in the database
  squad
    .save(squad)
    .then((data) => {
      res.send(data);

      const updateMatchField = {};
      updateMatchField.squad = data._id;

      Match.findByIdAndUpdate(matchID, updateMatchField, {
        useFindAndModify: false,
      })
        .then((data) => {
          if (!data) {
            res.status(404).send({
              message: `Cannot update Match with id: ${matchID}. Maybe Squad was not found!`,
            });
          } else res.send({ message: "Match was updated successfully." });
        })
        .catch((err) => {
          res.status(500).send({
            error: err.message,
          });
        });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Squad.",
      });
    });
};

// update Squad
exports.updateSquad = (req, res) => {
  // console.log("REQUESTED DATA", req.body);
  const id = req.params.id;

  Squad.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Squad with id: ${id}. Maybe Squad was not found!`,
        });
      } else res.send({ message: "Squad was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        error: err.message,
      });
    });
};

// delete one Squad
exports.deleteOneSquad = (req, res) => {
  const id = req.params.id;
  Squad.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Squad with id=${id}. Maybe Squad was not found!`,
        });
      } else {
        res.send({
          message: "Squad was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};

// delete all Squad
exports.deleteAllSquad = (req, res) => {
  Squad.deleteMany({})
    .then((data) => {
      res.send({
        message: `${data.deletedCount} Squads were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while deleting all Squad.",
      });
    });
};
