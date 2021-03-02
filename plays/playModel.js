const db = require("../data/dbConfig.js");

const addPlay = async play => {
  return await db("plays").insert(play).returning("id");
};

const getByPlaybookId = async playbook_id => {
    return await db("plays").where({playbook_id})
}

const getById = async id => {
  const play = await db("plays").where({id}).first()
  let steps = []
  let node = await db("steps").where({id: play.head_step}).first()
  while(node) {
    steps = [...steps, node]
    node = await db("steps").where({id: node.next}).first()
  }
  return {play: play, steps: steps}
}

const updatePlay = async (changes, id) => {
  return await db("plays").where({id}).update(changes)
}

module.exports = {
    addPlay,
    getByPlaybookId,
    getById,
    updatePlay
};
