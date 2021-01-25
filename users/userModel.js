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
  await db("org_users").insert(orgUser)
  const user_id = orgUser.user_id
  return await db("org_users").where({user_id}).join("users", "org_users.user_id", "users.id")
}

const getOrgUser = async user_id => {
  return await db("org_users").join("orgs", "org_users.org_id", "=", "orgs.id").where({user_id})
}

const getOrgUsers = async () => {
  return await db("org_users")
}

const getOrgUsersByOrgId = async org_id => {
  return await db("org_users").where({org_id}).join("users", "org_users.user_id", "users.id")
}

const updateUser = async (id, changes) => {
  return await db("users").where({id}).update(changes)
}

module.exports = {
  addUser,
  findBy,
  addOrgUser,
  getOrgUser,
  getOrgUsers,
  getOrgUsersByOrgId,
  updateUser
};
