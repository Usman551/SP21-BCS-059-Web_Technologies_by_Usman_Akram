var express = require('express');
var router = express.Router();


router.get('/ajaxapi', function(req, res, next) {
  res.render('ajaxapi');
});

module.exports = router;
