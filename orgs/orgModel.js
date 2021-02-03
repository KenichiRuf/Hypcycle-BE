const db = require("../data/dbConfig.js");

const addOrg = async org => {
  return await db("orgs").insert(org).returning("id");
};

const findBy = async filter => {
  return await db("orgs")
    .where(filter)
    .first();
};

const deleteOrg = async id => {
  return await db("orgs").where({id}).del()
}

module.exports = {
  addOrg,
  findBy,
  deleteOrg
};
