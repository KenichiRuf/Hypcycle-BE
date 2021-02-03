const db = require("../data/dbConfig.js");

const addTag = async tag => {
  return await db("tags").insert(tag).returning("id");
};

const getTags = async () => {
    return await db("tags")
}

const addGoalTag = async (goal_id, tag_id) => {
    return await db("goal_tags").insert({goal_id, tag_id}).returning("id")
}

const addIdeaTag = async (idea_id, tag_id) => {
    return await db("idea_tags").insert({idea_id, tag_id}).returning("id")
}

const getGoalTags = async goal_id => {
    return await db("goal_tags").where({goal_id})
}

const getIdeaTags = async idea_id => {
    return await db("idea_tags").where({idea_id})
}

module.exports = {
    addTag,
    getTags,
    addGoalTag,
    addIdeaTag,
    getGoalTags,
    getIdeaTags
};
