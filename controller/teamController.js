// loading models
const Team = require("../model/Team");
const Match = require("../model/Match");

// find all Team
exports.findAllTeam = (req, res) => {
  Team.find({})
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Team.",
      });
    });
};

// reading Team
exports.findOneTeam = (req, res) => {
  const id = req.params.id;

  Team.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found Team with id: " + id });
      else res.send(data);
    })
    .catch((err) => {
      res.status(500).send({ message: "Error retrieving Team with id: " + id });
    });
};

// create Team
exports.createTeam = (req, res) => {
  const team = new Team({
    user: req.user,
    name: req.body.name,
    year: req.body.year,
    level: req.body.level,
  });

  // Save Team in the database
  team
    .save(team)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Team.",
      });
    });
};

// update Team
exports.updateTeam = (req, res) => {
  console.log("REQUESTED DATA", req.body);
  const id = req.params.id;

  Team.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Team with id: ${id}. Maybe Team was not found!`,
        });
      } else res.send({ message: "Team was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        error: err.message,
      });
    });
};

// delete one Team
exports.deleteOneTeam = (req, res) => {
  const id = req.params.id;
  // chech descendant first
  Match.findOne({ team: id })
    .then((data) => {
      if (data) {
        res.status(201).send({
          message:
            "Team can't be deleted as long as any match is assigned to that team.",
        });
      } else {
        Team.findByIdAndRemove(id)
          .then(() => {
            res.send({
              message: "Team was deleted successfully!",
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

// delete all Team
exports.deleteAllTeam = (req, res) => {
  Team.deleteMany({})
    .then((data) => {
      res.send({
        message: `${data.deletedCount} Team were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while deleting all Team.",
      });
    });
};
