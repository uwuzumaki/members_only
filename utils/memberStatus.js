const db = require("../db/queries");

module.exports = memberStatus = async (user) => {
  const [getUser] = await db.getOneMemberID(user);
  user = getUser.member_status;
  return user;
};
