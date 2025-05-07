const { Router } = require("express");
const memberController = require("../controllers/memberController");
const registerValidation = require("../validation/registerValidation");
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

module.exports = memberRouter;
