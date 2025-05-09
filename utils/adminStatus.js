const db = require("../db/queries");

module.exports = adminStatus = async (user) => {
  const [getUser] = await db.getOneMemberID(user);
  user = getUser.admin_status;
  return user;
};
