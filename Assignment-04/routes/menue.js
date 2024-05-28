var express = require('express');
var router = express.Router();
let MenuItem = require("../models/product");
/* GET home page. */
router.get('/menue', async (req, res) => {
    const menuItems = await MenuItem.find();
    res.render('menue', { menuItems});
});
module.exports = router;