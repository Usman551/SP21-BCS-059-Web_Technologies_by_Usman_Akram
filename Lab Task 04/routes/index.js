var express = require('express');

var router = express.Router();
const User = require("../models/user");
/* GET home page. */
router.get('/home', async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  res.render('index', {user});
});

module.exports = router;
