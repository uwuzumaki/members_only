const session = require("express-session");
const pgSession = require("connect-pg-simple");
const pgConnect = pgSession(session);
const pool = require("../db/pool");
require("dotenv").config();

module.exports = () =>
  session({
    store: new pgConnect({
      pool: pool,
      tableName: "user_sessions",
      createTableIfMissing: true,
    }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 },
  });
