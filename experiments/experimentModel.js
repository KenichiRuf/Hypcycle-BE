const db = require("../data/dbConfig.js");

const addExperiment = async experiment => {
    return await db("experimetns").insert(experiment)
}

const updateExperiment = async (changes, id) => {
    return await db("experiments").where({id}).update(changes)
}

module.exports = {
    addExperiment,
    updateExperiment
};
