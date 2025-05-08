const bcrypt = require("bcryptjs");
const passport = require("passport");
const { validationResult } = require("express-validator");
require("dotenv").config();

const db = require("../db/queries");

const homepage = (req, res) => {
  res.render("homepage");
};

const registerGet = (req, res) => {
  res.render("registerGet");
};

const registerPost = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

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

const specialGet = (req, res) => {
  res.render("specialGet");
};

const specialPost = async (req, res) => {
  const verify =
    req.body.passcode === process.env.SECRET_PASSCODE ? true : false;
  if (verify) {
    await db.updateMemberStatus(req.session.passport.user);
  } else {
    throw new Error("That secret passcode is not correct!");
  }
  res.redirect("/");
};

module.exports = {
  homepage,
  registerGet,
  registerPost,
  loginGet,
  loginPost,
  specialGet,
  specialPost,
};
