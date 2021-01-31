const db = require("../data/dbConfig.js");

const addExperiment = async experiment => {
    const newExperiment = await db("experiments").insert(experiment)
    await db("ideas").where({id: experiment.idea_id}).update({converted: true})
    return newExperiment
}

const updateExperiment = async (changes, id) => {
    return await db("experiments").where({id}).update(changes)
}

const getByOrgId = async org_id => {
    return await db("experiments").where({org_id})
}

const getByGoalId = async goal_id => {
    return await db("experiments").join("ideas", function() {
        this.on("experiments.idea_id", '=', 'ideas.id').onIn("ideas.goal_id", goal_id)
    })
}

module.exports = {
    addExperiment,
    updateExperiment,
    getByOrgId,
    getByGoalId
};
