const db = require("../data/dbConfig.js");

const addUser = async user => {
  return await db("users").insert(user);
};

const findBy = async filter => {
  return await db("users")
    .where(filter)
    .first();
};

const register = async (user,org) => {
  const newUser = await db("users").insert(user)
  const newOrg = await db("orgs").insert(org)
  return {user: newUser, org: newOrg}
}

const addOrgUser = async (userId, orgId) => {
  console.log("addOrgUser", userId, orgId)
  const orgUser = {
    user_id: userId,
    org_id: orgId
  }
  return await db("org_users").insert(orgUser)
}

module.exports = {
  addUser,
  findBy,
  register,
  addOrgUser
};
