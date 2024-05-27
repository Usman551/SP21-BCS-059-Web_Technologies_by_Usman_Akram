var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/header', function(req, res, next) {
  res.render('header');
});

module.exports = router;
