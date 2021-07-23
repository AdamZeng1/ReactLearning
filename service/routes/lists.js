var express = require('express');
var router = express.Router();
var lists = require('../controllers/list.controller');

/* GET users listing. */
// router.post('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

router.post('/', lists.create);

// Update a List with id
router.put("/:id", lists.update);

// Delete a List with id
router.delete("/:id", lists.delete);



module.exports = router;
