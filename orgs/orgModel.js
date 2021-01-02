const db = require("../data/dbConfig.js");

const addOrg = async org => {
  return await db("orgs").insert(org);
};

const findBy = async filter => {
  return await db("orgs")
    .where(filter)
    .first();
};

module.exports = { addOrg, findBy };
