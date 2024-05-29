let express = require("express");
let router = express.Router();
let User = require("../models/user");
const bcrypt = require("bcryptjs");

router.get("/login", (req, res) => {
    res.render("login", {
        title: "rOOk - Login",
        active: ""
    });
});

router.post("/login", async function (req, res) {
    let user = await User.findOne({ username: req.body.username });
    if (!user) {
      return res.redirect("/login");
    }
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (validPassword) {
      req.session.user = user;
      return res.redirect("/admin/all-articles");
    } else {
      return res.redirect("/login");
    }
  });

router.get("/logout", async (req, res) => {
    req.session.user = null;
    console.log("session clear");
    return res.redirect("/");
  });

// router.post("/register", async function (req, res) {
//     let user = await User.findOne({ username: req.body.username });
//     if (user) {
//       return res.redirect("/register");
//     }
//     user = new User(req.body);
//     const salt = await bcrypt.genSalt(10);
//     user.password = await bcrypt.hash(req.body.password, salt);
  
//     await user.save();
//     console.log(user);
//     res.redirect("/login");
// });


module.exports = router;