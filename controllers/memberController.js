const bcrypt = require("bcryptjs");
const pool = require("../db/pool");
const passport = require("passport");

const homepage = (req, res) => {
  res.render("homepage");
};

const registerGet = (req, res) => {
  res.render("registerGet");
};

const registerPost = async (req, res, next) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    await pool.query(
      "INSERT INTO member (username, first_name, last_name, password) VAlUES ($1, $2, $3, $4)",
      [
        req.body.username,
        req.body.first_name,
        req.body.last_name,
        hashedPassword,
      ]
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
