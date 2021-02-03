const db = require("../data/dbConfig.js");

const addPlaybook = async playbook => {
  return await db("playbooks").insert(playbook).returning("id");
};

const getByOrgId = async org_id => {
    return await db("playbooks").where({org_id})
}

module.exports = {
    addPlaybook,
    getByOrgId
};
