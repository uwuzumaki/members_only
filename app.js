const path = require("path");
const express = require("express");
const passport = require("passport");

const memberRouter = require("./routes/memberRouter");
const sessions = require("./session/session");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(sessions());
app.use(passport.session());
require("./passport/passport");

app.use("/", memberRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Running on port ${PORT}`));
