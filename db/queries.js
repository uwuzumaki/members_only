const pool = require("./pool");

const registerMember = async (user, first, last, password) => {
  await pool.query(
    "INSERT INTO member (username, first_name, last_name, password) VAlUES ($1, $2, $3, $4)",
    [user, first, last, password],
  );
};

const getOneMemberUsername = async (user) => {
  const { rows } = await pool.query(
    "SELECT * FROM member WHERE username = $1",
    [user],
  );
  return rows;
};

const getOneMemberID = async (user) => {
  const { rows } = await pool.query("SELECT * FROM member WHERE user_id = $1", [
    user,
  ]);
  return rows;
};

const updateMemberStatus = async (user) => {
  const { rows } = await pool.query(
    "UPDATE member SET member_status= TRUE WHERE user_id = $1;",
    [user],
  );
  return rows;
};

const updateAdminStatus = async (user) => {
  const { rows } = await pool.query(
    "UPDATE member SET admin_status= TRUE WHERE user_id = $1;",
    [user],
  );
  return rows;
};

const createPost = async (user, title, content) => {
  const { rows } = await pool.query(
    "INSERT INTO posts (poster_id, title, contents) VALUES ($1, $2, $3)",
    [user, title, content],
  );
  return rows;
};

module.exports = {
  registerMember,
  getOneMemberUsername,
  getOneMemberID,
  updateMemberStatus,
  updateAdminStatus,
  createPost,
};
