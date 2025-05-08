const { Router } = require("express");
const memberController = require("../controllers/memberController");
const registerValidation = require("../validation/registerValidation");
const isAuth = require("../utils/authentication");
const memberRouter = Router();

memberRouter.get("/", memberController.homepage);
memberRouter.get("/register", memberController.registerGet);
memberRouter.post(
  "/register",
  registerValidation.registrationValidator,
  memberController.registerPost
);
memberRouter.get("/login", memberController.loginGet);
memberRouter.post("/login", memberController.loginPost);
memberRouter.get("/special", isAuth.isAuth, memberController.specialGet);
memberRouter.post("/special", memberController.specialPost);

module.exports = memberRouter;
