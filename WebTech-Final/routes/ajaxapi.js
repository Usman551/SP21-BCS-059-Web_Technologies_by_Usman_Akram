var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/ajaxapi', function(req, res, next) {
  res.render('ajaxapi');
});

module.exports = router;
