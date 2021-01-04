const db = require("../data/dbConfig.js");

const addPlay = async play => {
  return await db("plays").insert(play);
};

const getByPlaybookId = async playbook_id => {
    return await db("plays").where({playbook_id})
}

module.exports = {
    addPlay,
    getByPlaybookId
};
