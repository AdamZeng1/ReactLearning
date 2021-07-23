var express = require('express');
var router = express.Router();
var cards = require('../controllers/card.controller');

/* GET users listing. */
// router.post('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

router.post('/', cards.create);

// Update a Card with id
router.put("/:id", cards.update);

// Delete a Card with id
router.delete("/:id", cards.delete);
// app.delete("/:id", cards.delete);

module.exports = router;
