// loading models
const Expense = require("../model/Expense");

// find all Expense
exports.findAllExpense = (req, res) => {
  console.log(req.body);
  const { startDate, endDate } = req.body;
  Expense.find({
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
        message: err.message || "Some error occurred while retrieving Expense.",
      });
    });
};

// reading Expense
exports.findOneExpense = (req, res) => {
  const id = req.params.id;

  Expense.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found Expense with id: " + id });
      else res.send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error retrieving Expense with id: " + id });
    });
};

// create Expense
exports.createExpense = (req, res) => {
  const expense = new Expense({
    user: req.user,
    amount: req.body.amount,
    reference: req.body.reference,
    type: req.body.type,
    date: req.body.date,
  });

  // Save Expense in the database
  expense
    .save(expense)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Expense.",
      });
    });
};

// update Expense
exports.updateExpense = (req, res) => {
  // console.log("REQUESTED DATA", req.body);
  const id = req.params.id;

  Expense.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Expense with id: ${id}. Maybe Expense was not found!`,
        });
      } else res.send({ message: "Expense was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        error: err.message,
      });
    });
};

// delete one Expense
exports.deleteOneExpense = (req, res) => {
  const id = req.params.id;
  Expense.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Expense with id=${id}. Maybe Expense was not found!`,
        });
      } else {
        res.send({
          message: "Expense was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};

// delete all Expense
exports.deleteAllExpense = (req, res) => {
  Expense.deleteMany({})
    .then((data) => {
      res.send({
        message: `${data.deletedCount} Expenses were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while deleting all Expense.",
      });
    });
};
