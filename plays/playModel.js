const db = require("../data/dbConfig.js");

const addPlay = async play => {
  return await db("plays").insert(play).returning("id");
};

const getByPlaybookId = async playbook_id => {
    return await db("plays").where({playbook_id})
}

const getById = async id => {
  const play = await db("plays").where({id}).first()
  const steps = await db("steps").where({play_id: id})
  return {play: play, steps: steps}
}

module.exports = {
    addPlay,
    getByPlaybookId,
    getById
};
