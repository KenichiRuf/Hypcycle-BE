const db = require("../data/dbConfig.js");

const addGoal = async goal => {
  return await db("goals").insert(goal).returning("id");
};

const updateGoal = async (changes, id) => {
    return await db("goals").where({id}).update(changes)
}

const getGoalsByOrgId = async org_id => {
    return await db("goals").where({org_id})
}

const getGoalTagsByOrgId = async org_id => {
    return await db("goal_tags")
    .join("tags", "tags.id", "goal_tags.tag_id")
    .select("tags.name as tag_name", "goal_tags.goal_id")
    .join("goals", function(){
        this.on("goal_tags.goal_id", "=", "goals.id").onIn("goals.org_id", org_id)
    })
}

const getGoalTags = async () => {
    return await db("goal_tags")
}

const deleteGoal = async id => {
    return await db("goals").where({id}).del()
}

module.exports = {
    addGoal,
    updateGoal,
    getGoalsByOrgId,
    getGoalTagsByOrgId,
    getGoalTags,
    deleteGoal
};
