var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/menue', function(req, res, next) {
  res.render('menue');
});

module.exports = router;