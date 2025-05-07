const bcrypt = require("bcryptjs");
const passport = require("passport");

const db = require("../db/queries");

const homepage = (req, res) => {
  res.render("homepage");
};

const registerGet = (req, res) => {
  res.render("registerGet");
};

const registerPost = async (req, res, next) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    await db.registerMember(
      req.body.username,
      req.body.first_name,
      req.body.last_name,
      hashedPassword
    );
    res.redirect("/");
  } catch (err) {
    return next(err);
  }
};

const loginGet = (req, res) => {
  res.render("loginGet");
};

const loginPost = passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/login",
});

module.exports = {
  homepage,
  registerGet,
  registerPost,
  loginGet,
  loginPost,
};
