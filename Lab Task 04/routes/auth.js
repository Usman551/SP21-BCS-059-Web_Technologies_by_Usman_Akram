var express = require("express");
var router = express.Router();

const User = require("../models/user");
const bcrypt = require("bcryptjs");


router.get("/login", function (req, res, next) {
    return res.render("logintypeselect");
});
router.get("/user/login", function (req, res, next) {
    return res.render("userlogin");
});
router.post("/user/login", async (req, res) => {
    let user = await User.findOne({ email: req.body.email });
    if (!user) {
        console.log("User not found");
        return res.redirect("/signup");
    }
    if (user.password != req.body.password) {
        console.log("password not matched");

        return res.render("index", { user });
    }
    req.session.user = user;
    console.log("user added successfully");
    return res.redirect("/home");
});

router.get("/admin/login", function (req, res, next) {
    return res.render("admin/adminlogin");
});


router.post("/admin", async (req, res) => {

    if (req.body.email == 'admin@gmail.com' && req.body.password == 'admin123') {
        console.log("admin login successfully");
        return res.redirect("/admin");
    }
    else {
        console.log("admin login failed");
        return res.redirect("/admin/login");
    }
});
router.get("/signup", function (req, res, next) {
    return res.render("signup");
});
router.post("/signup", async function (req, res, next) {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
        console.log("User already exists");
        return res.redirect("/signup");
    }
    user = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
    });


    await user.save();
    console.log(user)
    return res.redirect("/user/login");
});
router.get("/logout", async (req, res) => {
    req.session.user = null;
    console.log("session clear");
    return res.redirect("/home");
});


module.exports = router;