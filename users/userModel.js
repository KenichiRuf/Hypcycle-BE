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
  return await db("org_users").join("users", function() {
    this.on("org_users.user_id", "=", "users.id").onIn("org_users.user_id", user_id)
  })
}

const getOrgUsers = async user_id => {
  return await db("org_users").join("orgs", function() {
    this.on("org_users.org_id", "=", "orgs.id").onIn("org_users.user_id", user_id)
  })
}

const getOrgUsersByOrgId = async org_id => {
  return await db("org_users").join("users", function() {
    this.on("org_users.user_id", "users.id").onIn("org_users.org_id", org_id)
  })
}

const updateUser = async (id, changes) => {
  return await db("users").where({id}).update(changes)
}

const getUsers = async () => {
  return await db("users")
}

const deleteUser = async id => {
  return await db("users").where({id}).del()
}

const deleteOrgUser = async id => {
  return await db("org_users").where({id}).del()
}

const register = async (user,org) => {
  let newUser = await addUser(user)
  let newOrg = await db("orgs").insert(org)
  
  var wait;

  function addNewOrgUser() {
    wait = setTimeout(callback, 500)
  }

  function callback() {
    addOrgUser({user_id: newUser[0], org_id: newOrg[0]})
  }

  addNewOrgUser()

  return [newUser, newOrg]
}

module.exports = {
  addUser,
  findBy,
  addOrgUser,
  getOrgUsers,
  getOrgUsersByOrgId,
  updateUser,
  getUsers,
  deleteUser,
  deleteOrgUser,
  register
};
