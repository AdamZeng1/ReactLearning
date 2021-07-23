const Board = require('../models/boards.model.js');


// Find a single Customer with a customerId
exports.findById = (req, res) => {
  Board.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Board with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Board with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};