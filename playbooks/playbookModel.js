const db = require("../data/dbConfig.js");

const addPlaybook = async playbook => {
  return await db("playbooks").insert(playbook).returning("id");
};

const getByOrgId = async org_id => {
    return await db("playbooks").where({org_id})
}

const getById = async id => {
  const playbook = await db("playbooks").where({id}).first()
  const objectives = await db("objectives").where({playbook_id: id})
  const plays = await db("plays").where({playbook_id: id})
  return {playbook, objectives, plays}
}

module.exports = {
    addPlaybook,
    getByOrgId,
    getById
};
