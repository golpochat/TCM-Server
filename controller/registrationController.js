// loading models
const Registration = require("../model/Registration");
const Profile = require("../model/Profile");

// find all Registration
exports.isRegistered = (req, res) => {
  const id = req.params.id;
  Registration.find({
    profile: id,
    year_of_registration: new Date().getFullYear(),
  })
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

// find all Registration
exports.findAllRegistrationPayment = (req, res) => {
  const id = req.params.id;
  console.log(id);
  Registration.find({ status: "registered", profile: id })
    .then((data) => {
      if (!data)
        res
          .status(404)
          .send({ message: "Not found Registration with id: " + id });
      else res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Registration.",
      });
    });
};

// find all Registration
exports.findAllRegistration = (req, res) => {
  Registration.find({ year_of_registration: new Date().getFullYear() })
    .populate("profile")
    .then((data) => {
      if (!data)
        res
          .status(404)
          .send({ message: "Not found Registration with id: " + id });
      else res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Registration.",
      });
    });
};

// reading Registration
exports.findOneRegistration = (req, res) => {
  const id = req.params.id;

  Registration.findById(id)
    // .populate("profile", "first_name last_name")
    .then((data) => {
      if (!data)
        res
          .status(404)
          .send({ message: "Not found Registration with id: " + id });
      else res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Registration with id: " + id,
      });
    });
};

// create Registration
exports.createRegistration = (req, res) => {
  const id = req.params.id;
  const registration = new Registration({
    // user: "",
    profile: id,
    note: "n/a",
    year_of_registration: new Date().getFullYear(),
    fee: 0,
    status: "pending",
  });

  // Save Registration in the database
  registration
    .save(registration)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Registration.",
      });
    });
};

// update Registration
exports.updateRegistration = (req, res) => {
  console.log("REQUESTED DATA", req.body);
  const id = req.params.id;

  const registrationFields = {};
  registrationFields.user = req.user;
  registrationFields.fee = req.body.fee;
  registrationFields.year_of_registration = new Date(
    req.body.year_of_registration
  ).getFullYear();
  registrationFields.note = req.body.note;
  registrationFields.status = req.body.status;

  Registration.findByIdAndUpdate(id, registrationFields, {
    useFindAndModify: false,
  })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Registration with id: ${id}. Maybe Registration was not found!`,
        });
      } else res.send({ message: "Registration was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        error: err.message,
      });
    });
};

// delete one Registration
exports.deleteOneRegistration = (req, res) => {
  const id = req.params.id;
  // chech descendant first
  Profile.findOne({ registration: id })
    .then((data) => {
      if (data) {
        res.status(201).send({
          message:
            "Registration can't be deleted as long as any profile is assigned to that Registration.",
        });
      } else {
        Registration.findByIdAndRemove(id)
          .then(() => {
            res.send({
              message: "Registration was deleted successfully!",
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

// delete all Registration
exports.deleteAllRegistration = (req, res) => {
  Registration.deleteMany({})
    .then((data) => {
      res.send({
        message: `${data.deletedCount} Registration were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while deleting all Registration.",
      });
    });
};
