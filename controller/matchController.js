// loading models
const Match = require("../model/Match");

// find all Matchs
exports.findAllMatch = (req, res) => {
  Match.find({})
    .populate("tournament", ["name"])
    .populate("team", ["name"])
    .populate("squad")
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Matchs.",
      });
    });
};

// find all Matchs by tournament
exports.findAllMatchByTournament = (req, res) => {
  const id = req.params.id;
  Match.find({ tournament: id })
    .populate("tournament", ["name"])
    .populate("team", ["name"])
    .populate("squad")
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Matchs.",
      });
    });
};
// find all Matchs by team
exports.findAllMatchByTeam = (req, res) => {
  const id = req.params.id;
  Match.find({ team: id })
    .populate("tournament", ["name"])
    .populate("team", ["name"])
    .populate("squad")
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Matchs.",
      });
    });
};

// reading Match
exports.findOneMatch = (req, res) => {
  const id = req.params.id;

  Match.findById(id)
    .populate("tournament", ["name"])
    .populate("team", ["name"])
    .populate("squad")
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found Match with id: " + id });
      else res.send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error retrieving Match with id: " + id });
    });
};

// create Match
exports.createMatch = (req, res) => {
  console.log(req.body);
  const match = new Match({
    user: req.user,
    team: req.body.team,
    tournament: req.body.tournament,
    opponent: req.body.opponent || "tba",
    duration: req.body.duration,
    match_no: req.body.match_no,
    run: req.body.run,
    result: req.body.result,
    umpire: req.body.umpire,
    date: req.body.date,
  });

  // Save Match in the database
  match
    .save(match)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Match.",
      });
    });
};

// create multiple Matches
exports.createMultipleMatches = (req, res) => {
  let multipleatches = [];
  for (let i = 0; i < req.body.games; ++i) {
    multipleatches.push({
      user: req.user,
      team: req.team || null,
      tournament: req.body.tournament || null,
      oppenent: "tba",
      match_no: i + 1,
      duration: 20,
      run: 0,
      result: "tbp",
      umpire: "unofficial",
    });
  }
  Match.insertMany(multipleatches)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Match.",
      });
    });
};

// update Match
exports.updateMatch = (req, res) => {
  console.log("UPDATE Match DATA", req.body);
  const id = req.params.id;

  Match.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Match with id: ${id}. Maybe Match was not found!`,
        });
      } else res.send({ message: "Match was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        error: err.message,
      });
    });
};

// delete Match
exports.deleteOneMatch = (req, res) => {
  // const id = req.params.id;

  // Match.findByIdAndRemove(id)
  //   .then((data) => {
  //     if (!data) {
  //       res.status(404).send({
  //         message: `Cannot delete Match with id=${id}. Maybe Match was not found!`,
  //       });
  //     } else {
  //       res.send({
  //         message: "Match was deleted successfully!",
  //       });
  //     }
  //   })
  //   .catch((err) => {
  //     res.status(500).send({
  //       message: err.message,
  //     });
  //   });

  const id = req.params.id;
  // chech descendant first
  Match.findOne({ matchDetail: id })
    .then((data) => {
      if (data) {
        res.status(201).send({
          message:
            "Match can't be deleted as long as any match-detail exists with that match.",
        });
      } else {
        Match.findByIdAndRemove(id)
          .then(() => {
            res.send({
              message: "Match was deleted successfully!",
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

// delete all Matchs
exports.deleteAllMatch = (req, res) => {
  Match.deleteMany({})
    .then((data) => {
      res.send({
        message: `${data.deletedCount} Matches were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while deleting all Matches.",
      });
    });
};
