// loading models
const MatchDetail = require("../model/MatchDetail");
// find all MatchDetails by match_id
exports.findAllMatchDetailByMatchId = (req, res) => {
  const id = req.params.id;
  // console.log(id);
  MatchDetail.find({ match: id })
    .then((data) => {
      res.send(data);
      console.log(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving MatchDetails.",
      });
    });
};

// find all MatchDetails for over all ranking
exports.rankingByProfileId = (req, res) => {
  const id = req.params.id;
  MatchDetail.aggregate([
    { $match: { profile: id } },
    {
      $group: {
        _id: { profile: "$profile" },
        run: { $sum: "$run" },
        wicket: { $sum: "$wicket" },
      },
    },
  ])
    .then((data) => {
      res.send(data);
      console.log(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving MatchDetails.",
      });
    });
};

// find all MatchDetails for over all ranking
exports.overallRanking = (req, res) => {
  MatchDetail.aggregate([
    {
      $group: {
        _id: { profile: "$profile" },
        run: { $sum: "$run" },
        wicket: { $sum: "$wicket" },
        profile: { $first: "$profile" },
      },
    },
    { $sort: { run: -1, wicket: -1 } },

    {
      $lookup: {
        from: "profiles",
        localField: "matchDetail.profile",
        foreignField: "profile._id",
        as: "profiles",
      },
    },
    {
      $unwind: "$profile",
    },
  ])
    .then((data) => {
      res.send(data);
      console.log(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving MatchDetails.",
      });
    });
};

// find all MatchDetails by player id
exports.findAllMatchDetailByPlayerId = (req, res) => {
  const id = req.params.id;
  MatchDetail.find({ profile: id })
    .populate("match")
    .then((data) => {
      res.send(data);
      console.log(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving MatchDetails.",
      });
    });
};

// find all MatchDetails by profile id
exports.findAllMatchDetailFee = (req, res) => {
  MatchDetail.find({ profile: id })
    .populate("match")
    .then((data) => {
      res.send(data);
      console.log(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving MatchDetails.",
      });
    });
};

// reading MatchDetail
exports.findOneMatchDetail = (req, res) => {
  const id = req.params.id;
  // console.log(id);
  MatchDetail.findById(id)
    .then((data) => {
      if (!data)
        res
          .status(404)
          .send({ message: "Not found MatchDetail with id: " + id });
      else res.send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error retrieving MatchDetail with id: " + id });
    });
};

// create MatchDetail
exports.createMatchDetail = (req, res) => {
  console.log(req.body);
  // console.log(req.params.id);
  const matchDetail = new MatchDetail({
    match: req.body.match,
    profile: req.body.profile,
    wicket: req.body.wicket,
    run: req.body.run,
    match_fee: req.body.match_fee,
  });
  // Save MatchDetail in the database
  matchDetail
    .save(matchDetail)
    .then((data) => {
      return res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the MatchDetail.",
      });
    });
};

// update MatchDetail
exports.updateMatchDetail = (req, res) => {
  // console.log("UPDATE MatchDetail DATA", req.body);
  const id = req.params.id;
  console.log(id);
  MatchDetail.findByIdAndUpdate(id, req.body, {
    useFindAndModify: false,
  })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update MatchDetail with id: ${id}. Maybe MatchDetail was not found!`,
        });
      } else res.send({ message: "MatchDetail was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        error: err.message,
      });
    });
};

// delete MatchDetail
exports.deleteOneMatchDetail = (req, res) => {
  const id = req.params.id;

  MatchDetail.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete MatchDetail with id=${id}. Maybe MatchDetail was not found!`,
        });
      } else {
        res.send({
          message: "MatchDetail was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};

// delete all MatchDetails
exports.deleteAllMatchDetail = (req, res) => {
  MatchDetail.deleteMany({})
    .then((data) => {
      res.send({
        message: `${data.deletedCount} MatchDetailes were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while deleting all MatchDetailes.",
      });
    });
};
