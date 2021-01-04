const db = require("../data/dbConfig.js");

const getDashboardData = async org_id => {
    const experiments = await db("experiments").where({org_id})
    const goals = await db("goals").where({org_id})
    const ideas = await db("ideas").where({org_id})
    let data = {
        experiments: experiments,
        goals: goals,
        ideas: ideas
    }
    return data
}

module.exports = {
    getDashboardData
};
