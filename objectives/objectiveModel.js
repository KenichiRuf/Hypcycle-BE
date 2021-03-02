const db = require("../data/dbConfig.js");

const addObjective = async objective => {
  return await db("objectives").insert(objective).returning("id");
};

const getByPlaybookId = async playbook_id => {
    return await db("objectives").where({playbook_id})
}

module.exports = {
    addObjective,
    getByPlaybookId,
};
