const { Router } = require("express");
const memberController = require("../controllers/memberController");
const registerValidation = require("../validation/registerValidation");
const authentication = require("../utils/authentication");
const memberRouter = Router();

memberRouter.get("/", memberController.homepage);
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
memberRouter.get("/login", authentication.isNotAuth, memberController.loginGet);
memberRouter.post("/login", memberController.loginPost);
memberRouter.get("/logout", memberController.logoutPost);
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
memberRouter.get("/admin", authentication.isAuth, memberController.adminGet);
memberRouter.post("/admin", authentication.isAuth, memberController.adminPost);

module.exports = memberRouter;
