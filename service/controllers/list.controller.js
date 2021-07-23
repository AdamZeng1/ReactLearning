const List = require('../models/lists.model.js');


exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

   // Create a Customer
   const list = new List({
    name: req.body.name,
    boardId: req.body.boardId
  });

  // Save Customer in the database
  List.create(list, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the List."
      });
    else res.send(data);
  });
}

// Update a Customer identified by the customerId in the request
exports.update = (req, res) => {
// Validate Request
if (!req.body) {
    res.status(400).send({
    message: "Content can not be empty!"
    });
}

console.log(req.body);

List.updateById(
    req.params.id,
    new List(req.body),
    (err, data) => {
    if (err) {
        if (err.kind === "not_found") {
        res.status(404).send({
            message: `Not found List with id ${req.params.id}.`
        });
        } else {
        res.status(500).send({
            message: "Error updating List with id " + req.params.id
        });
        }
    } else res.send(data);
    }
);
};

exports.delete = (req, res) => {
    List.remove(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found List with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete List with id " + req.params.id
          });
        }
      } else res.send({ message: `List was deleted successfully!` });
    });
};