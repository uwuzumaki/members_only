const { Router } = require("express");
const memberController = require("../controllers/memberController");
const memberRouter = Router();

memberRouter.get("/", memberController.homepage);

module.exports = memberRouter;
