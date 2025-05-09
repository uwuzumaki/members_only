const bcrypt = require("bcryptjs");
const passport = require("passport");
const { validationResult } = require("express-validator");
require("dotenv").config();

const db = require("../db/queries");
const memberStatus = require("../utils/memberStatus");

const homepage = async (req, res) => {
  const loggedIn = res.locals.loggedIn;
  const mStatus = loggedIn ? await memberStatus(res.locals.user) : null;
  res.render("homepage", { loggedIn: loggedIn, user: mStatus });
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
      hashedPassword,
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

const logoutPost = (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
  });
  res.redirect("/");
};

const specialGet = async (req, res) => {
  const loggedIn = res.locals.loggedIn;
  const mStatus = loggedIn ? await memberStatus(res.locals.user) : null;
  res.render("specialGet", { loggedIn: loggedIn, user: mStatus });
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

const adminGet = async (req, res) => {
  const loggedIn = res.locals.loggedIn;
  const mStatus = loggedIn ? await memberStatus(res.locals.user) : null;
  res.render("adminGet", { loggedIn: loggedIn, user: mStatus });
};

const adminPost = async (req, res) => {
  const verify =
    req.body.admincode === process.env.ADMIN_PASSCODE ? true : false;
  if (verify) {
    await db.updateAdminStatus(req.session.passport.user);
  } else {
    throw new Error("That admin passcode is not correct!");
  }
  res.redirect("/");
};

module.exports = {
  homepage,
  registerGet,
  registerPost,
  loginGet,
  loginPost,
  logoutPost,
  specialGet,
  specialPost,
  adminGet,
  adminPost,
};
