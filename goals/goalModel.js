const db = require("../data/dbConfig.js");

const addGoal = async goal => {
  return await db("goals").insert(goal);
};

const updateGoal = async (changes, id) => {
    return await db("goals").where({id}).update(changes)
}

const getGoalsByOrgId = async org_id => {
    return await db("goals").where({org_id})
}

module.exports = {
    addGoal,
    updateGoal,
    getGoalsByOrgId
};
