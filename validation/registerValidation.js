const { body, validationResult } = require("express-validator");
const db = require("../db/queries");

const registrationValidator = [
  body("password")
    .trim()
    .escape()
    .isLength({ min: 8, max: 64 })
    .withMessage("Password must be between 8 and 64 characters long"),
  body("username")
    .trim()
    .escape()
    .custom(async (value) => {
      const user = await db.getOneMemberUsername(value);
      if (user.length) {
        throw new Error("Username already in use");
      }
      return true;
    }),
  body("match_password").custom((value, { req }) => {
    if (value != req.body.password) {
      throw new Error("Passwords do not match");
    }
    return true;
  }),
];

module.exports = {
  registrationValidator,
};
