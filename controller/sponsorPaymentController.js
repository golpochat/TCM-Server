// loading models
const SponsorPayment = require("../model/SponsorPayment");
const Sponsor = require("../model/Sponsor");

// find all payments by date
exports.findAllSponsorPaymentByDate = (req, res) => {
  // console.log(req.body);
  const { startDate, endDate } = req.body;
  SponsorPayment.find({
    date: {
      $gte: new Date(new Date(startDate).setHours(00, 00, 00)),
      $lte: new Date(new Date(endDate).setHours(23, 59, 59)),
    },
  })
    .then((data) => {
      res.send(data);
      console.log(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while retrieving sponsor payment.",
      });
    });
};

// find all SponsorPayment
exports.findAllSponsorPayment = (req, res) => {
  SponsorPayment.find({ sponsor: req.params.id })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving SponsorPayment.",
      });
    });
};

// reading SponsorPayment
exports.findOneSponsorPayment = (req, res) => {
  const id = req.params.id;

  SponsorPayment.findOne({ _id: id })
    .then((data) => {
      if (!data)
        res
          .status(404)
          .send({ message: "Not found SponsorPayment with id: " + id });
      else res.send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error retrieving SponsorPayment with id: " + id });
    });
};

// create SponsorPayment
exports.createSponsorPayment = (req, res) => {
  const id = req.params.id;
  Sponsor.findOne({ _id: id }, (err, sponsor) => {
    if (err || !sponsor) {
      return res.status(404).json({
        error: "Sponsor not found." + err,
      });
    }

    const sponsorPayment = new SponsorPayment({
      user: req.user,
      sponsor: sponsor,
      amount: req.body.amount,
      reference: req.body.reference,
      type: req.body.type,
      date: req.body.date,
    });

    // Save SponsorPayment in the database
    sponsorPayment
      .save(sponsorPayment)
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message ||
            "Some error occurred while creating the SponsorPayment.",
        });
      });
  });
};

// update SponsorPayment
exports.updateSponsorPayment = (req, res) => {
  console.log("REQUESTED DATA", req.body);
  const id = req.params.id;

  SponsorPayment.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update SponsorPayment with id: ${id}. Maybe SponsorPayment was not found!`,
        });
      } else res.send({ message: "SponsorPayment was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        error: err.message,
      });
    });
};

// delete one SponsorPayment
exports.deleteOneSponsorPayment = (req, res) => {
  const id = req.params.id;

  SponsorPayment.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete SponsorPayment with id=${id}. Maybe SponsorPayment was not found!`,
        });
      } else {
        res.send({
          message: "SponsorPayment was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};

// delete all SponsorPayment
exports.deleteAllSponsorPayment = (req, res) => {
  SponsorPayment.deleteMany({})
    .then((data) => {
      res.send({
        message: `${data.deletedCount} SponsorPayment were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while deleting all SponsorPayment.",
      });
    });
};
