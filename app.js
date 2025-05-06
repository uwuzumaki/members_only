const path = require("path");

const express = require("express");
const session = require("express-session");
const pgSession = require("connect-pg-simple");
const pgConnect = pgSession(session);
const pool = require("./db/pool");
require("dotenv").config();

const memberRouter = require("./routes/memberRouter");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use;
app.use(
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
  })
);

require("./passport/passport");

app.use("/", memberRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Running on port ${PORT}`));
