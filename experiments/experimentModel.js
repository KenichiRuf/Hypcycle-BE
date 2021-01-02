const db = require("../data/dbConfig.js");

const addExperiment = async experiment => {
    const newExperiment = await db("experiments").insert(experiment)
    await db("ideas").where({id: experiment.idea_id}).update({converted: true})
    return newExperiment
}

const updateExperiment = async (changes, id) => {
    return await db("experiments").where({id}).update(changes)
}

const getByOrgId = async id => {
    return await db("experiments").where({id})
}

module.exports = {
    addExperiment,
    updateExperiment,
    getByOrgId
};
