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
  return db("users").insert(user)
  // const newOrg = db("orgs").insert(org)
  // return [newUser, newOrg]
}

const addOrgUser = async (userId, orgId) => {
  const user_id = userId
  const org_id = orgId
  console.log(user_id, org_id)
  const orgUser = {
    user_id: user_id[0],
    org_id: org_id[0]
  }
  return await db("org_users").insert(orgUser)
}

module.exports = {
  addUser,
  findBy,
  register,
  addOrgUser
};
