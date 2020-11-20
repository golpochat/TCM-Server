// loading models
const Sponsor = require("../model/Sponsor");
const SponsorPayment = require("../model/SponsorPayment");

// find all sponsors
exports.findAllSponsor = (req, res) => {
  Sponsor.find({})
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving sponsors.",
      });
    });
};

// reading sponsor
exports.findOneSponsor = (req, res) => {
  const id = req.params.id;

  Sponsor.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found Sponsor with id: " + id });
      else res.send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error retrieving Sponsor with id: " + id });
    });
};

// create sponsor
exports.createSponsor = (req, res) => {
  const sponsor = new Sponsor({
    user: req.user,
    name: req.body.name,
    address: req.body.address,
    email: req.body.email,
    contact_number: req.body.contact_number,
    year: req.body.year,
  });

  // Save Sponsor in the database
  sponsor
    .save(sponsor)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Sponsor.",
      });
    });
};

// update sponsor
exports.updateSponsor = (req, res) => {
  console.log("UPDATE SPONSOR DATA", req.body);
  const id = req.params.id;

  Sponsor.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Sponsor with id: ${id}. Maybe Sponsor was not found!`,
        });
      } else res.send({ message: "Sponsor was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        error: err.message,
      });
    });
};

// delete sponsor
exports.deleteOneSponsor = (req, res) => {
  const id = req.params.id;
  SponsorPayment.findOne({ sponsor: id })
    .then((data) => {
      if (data) {
        res.status(201).send({
          message: "Sponsor can't be deleted as long as any payment exists.",
        });
      } else {
        Sponsor.findByIdAndRemove(id)
          .then(() => {
            res.send({
              message: "Sponsor was deleted successfully!",
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

// delete all sponsors
exports.deleteAllSponsor = (req, res) => {
  Sponsor.deleteMany({})
    .then((data) => {
      res.send({
        message: `${data.deletedCount} Sponsors were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while deleting all Sponsors.",
      });
    });
};
