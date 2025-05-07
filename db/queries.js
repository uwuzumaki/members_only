const pool = require("./pool");

const registerMember = async (user, first, last, password) => {
  await pool.query(
    "INSERT INTO member (username, first_name, last_name, password) VAlUES ($1, $2, $3, $4)",
    [user, first, last, password]
  );
};

const getOneMember = async (user) => {
  const { rows } = await pool.query(
    "SELECT * FROM member WHERE username = $1",
    [user]
  );
  return rows;
};

module.exports = { registerMember, getOneMember };
