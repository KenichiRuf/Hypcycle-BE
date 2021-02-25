const db = require("../data/dbConfig.js");

const addPlaybook = async playbook => {
  return await db("playbooks").insert(playbook).returning("id");
};

const getByOrgId = async org_id => {
    return await db("playbooks").where({org_id})
}

const getById = async id => {
  return await db("playbooks").where({id}).first()
}

module.exports = {
    addPlaybook,
    getByOrgId,
    getById
};
