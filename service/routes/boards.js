var express = require('express');
var router = express.Router();
var boards = require('../controllers/board.controller');

/* GET users listing. */
// router.post('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

router.get('/:id', boards.findById);


module.exports = router;
