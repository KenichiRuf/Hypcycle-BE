const db = require("../data/dbConfig.js");

const addUser = async user => {
  return await db("users").insert(user);
};

const findBy = async filter => {
  return await db("users")
    .where(filter)
    .first();
};

const addOrgUser = async orgUser => {
  return await db("org_users").insert(orgUser);
}

const getOrgUser = async user_id => {
  return await db("org_users").join("orgs", "org_users.org_id", "=", "orgs.id").where({user_id})
}

const getOrgUsers = async () => {
  return await db("org_users")
}

module.exports = {
  addUser,
  findBy,
  addOrgUser,
  getOrgUser,
  getOrgUsers
};
