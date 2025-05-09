const isAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res
      .status(401)
      .json({ message: "You are not authorized to view this page." });
  }
};

const isNotAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    res.status(401).redirect("/");
  } else {
    next();
  }
};

module.exports = {
  isAuth,
  isNotAuth,
};
