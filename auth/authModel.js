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

  var wait;

  async function addNewOrgUser() {
    console.log(newUser[0], newOrg[0])
    wait = setTimeout(callback, 1000)
  }

  async function callback() {
    console.log(newUser[0], newOrg[0])
    await db("org_users").insert({user_id: newUser[0], org_id: newOrg[0]})
  }

  addNewOrgUser()

  return [newUser, newOrg]
}

module.exports = {
  addUser,
  findBy,
  register
};
