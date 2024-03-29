const Card = require('../models/cards.model.js');


exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

   // Create a Customer
   const card = new Card({
    title: req.body.title,
    description: req.body.description,
    listId: req.body.listId
  });

  // Save Customer in the database
  Card.create(card, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Customer."
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

Card.updateById(
    req.params.id,
    new Card(req.body),
    (err, data) => {
    if (err) {
        if (err.kind === "not_found") {
        res.status(404).send({
            message: `Not found Card with id ${req.params.id}.`
        });
        } else {
        res.status(500).send({
            message: "Error updating Card with id " + req.params.id
        });
        }
    } else res.send(data);
    }
);
};

exports.delete = (req, res) => {
    Card.remove(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Card with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete Card with id " + req.params.id
          });
        }
      } else res.send({ message: `Card was deleted successfully!` });
    });
};