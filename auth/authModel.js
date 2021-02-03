const db = require("../data/dbConfig.js");

const addUser = async user => {
  return await db("users").insert(user).returning("id");
};

const findBy = async filter => {
  return await db("users")
    .where(filter)
    .first();
};

const addOrgUser = async (userId, orgId) => {
  const orgUser = {
    user_id: userId[0],
    org_id: orgId[0]
  }
  return await db("org_users").insert(orgUser).returning("id")
}

module.exports = {
  addUser,
  findBy,
  addOrgUser
};
