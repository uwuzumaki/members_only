const { Router } = require("express");
const memberController = require("../controllers/memberController");
const registerValidation = require("../validation/registerValidation");
const authentication = require("../utils/authentication");
const memberRouter = Router();

// Homepage
memberRouter.get("/", memberController.homepage);

// Register
memberRouter.get(
  "/register",
  authentication.isNotAuth,
  memberController.registerGet,
);
memberRouter.post(
  "/register",
  registerValidation.registrationValidator,
  memberController.registerPost,
);

// Login
memberRouter.get("/login", authentication.isNotAuth, memberController.loginGet);
memberRouter.post("/login", memberController.loginPost);

// Logout
memberRouter.get("/logout", memberController.logoutPost);

// Membership
memberRouter.get(
  "/special",
  authentication.isAuth,
  memberController.specialGet,
);
memberRouter.post(
  "/special",
  authentication.isAuth,
  memberController.specialPost,
);

// Admin
memberRouter.get("/admin", authentication.isAuth, memberController.adminGet);
memberRouter.post("/admin", authentication.isAuth, memberController.adminPost);

// Posts
memberRouter.post("/createPost", memberController.createPost);
memberRouter.post("/delete/:id", memberController.deletePost);

module.exports = memberRouter;
