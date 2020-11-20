// loading models
const Tournament = require("../model/Tournament");
const Match = require("../model/Match");

// find all Tournament
exports.findAllTournament = (req, res) => {
  Tournament.find({})
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Tournament.",
      });
    });
};

// reading Tournament
exports.findOneTournament = (req, res) => {
  const id = req.params.id;

  Tournament.findById(id)
    .then((data) => {
      if (!data)
        res
          .status(404)
          .send({ message: "Not found Tournament with id: " + id });
      else res.send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error retrieving Tournament with id: " + id });
    });
};

// create Tournament
exports.createTournament = (req, res) => {
  const tournament = new Tournament({
    user: req.user,
    name: req.body.name,
    year: req.body.year,
  });
  // Save Tournament in the database
  tournament
    .save(tournament)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tournament.",
      });
    });
};

// update Tournament
exports.updateTournament = (req, res) => {
  // console.log("REQUESTED DATA", req.body);
  const id = req.params.id;

  Tournament.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Tournament with id: ${id}. Maybe Tournament was not found!`,
        });
      } else res.send({ message: "Tournament was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        error: err.message,
      });
    });
};

// delete one Tournament
exports.deleteOneTournament = (req, res) => {
  const id = req.params.id;
  // chech descendant first
  Match.findOne({ tournament: id })
    .then((data) => {
      if (data) {
        res.status(201).send({
          message:
            "Tournament can't be deleted as long as any match exists in this tournament.",
        });
      } else {
        Tournament.findByIdAndRemove(id)
          .then(() => {
            res.send({
              message: "Tournament was deleted successfully!",
            });
          })
          .catch((err) => {
            res.status(500).send({
              message: err.message,
            });
          });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};

// delete all Tournament
exports.deleteAllTournament = (req, res) => {
  Tournament.deleteMany({})
    .then((data) => {
      res.send({
        message: `${data.deletedCount} Tournament were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while deleting all Tournament.",
      });
    });
};
