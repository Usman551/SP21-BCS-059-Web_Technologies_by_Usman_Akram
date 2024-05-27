var express = require("express");
var router = express.Router();

const User = require("../models/user");
const bcrypt = require("bcryptjs");

/* GET home page. */
router.get("/login", function (req, res, next) {
    return res.render("login");
});

router.post("/login", async (req, res) => {
    let user = await User.findOne({ email: req.body.email });
    if (!user) {
      res.flash("danger", "USer with given email already exist");
      return res.redirect("/signup");
    }
    if (user.password != req.body.password) {
    //   console.log("password not matched");
      return res.redirect("/home");
    }
    req.session.user = user;
    res.flash("success", user.username + " Logged In");
    return res.redirect("/home");
  });
router.get("/signup", function (req, res, next) {
    return res.render("signup");
});
router.get("/logout", async (req, res) => {
    req.session.user = null;
    console.log("session clear");
    return res.redirect("/login");
});
router.post("/signup", async function (req, res, next) {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
        req.flash("danger", "User with given email already registered");
        return res.redirect("/signup");
    }
    user = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
    });


    await user.save();
    console.log(user)
    return res.redirect("/login");
});

module.exports = router;