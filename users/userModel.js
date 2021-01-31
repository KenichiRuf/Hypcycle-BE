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

const getOrgUsers = async user_id => {
  return await db("org_users").join("orgs", "org_users.org_id", "=", "orgs.id").where({user_id})
}

const getOrgUsersByOrgId = async org_id => {
  return await db("org_users").where({org_id}).join("users", "org_users.user_id", "users.id")
}

const updateUser = async (id, changes) => {
  return await db("users").where({id}).update(changes)
}

const getUsers = async () => {
  return await db("users")
}

module.exports = {
  addUser,
  findBy,
  addOrgUser,
  getOrgUsers,
  getOrgUsersByOrgId,
  updateUser,
  getUsers
};
