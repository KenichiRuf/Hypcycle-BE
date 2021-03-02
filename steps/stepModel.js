const db = require("../data/dbConfig.js");

const addStep = async (step) => {
    const tail = await db("steps").where({play_id: step.play_id, next: null})
    if(tail.length === 0) {
        const newStep = await db("steps").insert(step).returning("id")
        await db("plays").where({id: step.play_id}).update({head_step: newStep[0]})
        return await db("steps").where({id: newStep[0]}).first()
    } else {
        const newStep = await db("steps").insert({...step, previous: tail[0].id}).returning("id")
        await db("steps").where({id: tail[0].id}).update({next: newStep[0]})
        return await db("steps").where({id: newStep[0]}).first()
    }
};

const getSteps = async id => {
    let node = await db("steps").where({id}).first()
    let steps = [node]
    if(node) {
        while (node.next) {
            node = await db("steps").where({id: node.next}).first()
            steps = [...steps, node]
        }
        return steps
    } else {
        return []
    }
}

const removeStep = async id => {
    const step = await db("steps").where({id}).first()
    if(!step.previous && !step.next) {
        await db("plays").where({id: step.play_id}).update({head_step: null})
    } else if(step.next) {
        
    } else {
        await db("steps").where({id: step.previous}).update({next: step.next})
    }

    if(step.previous && step.next) {
        await db("steps").where({id: step.previous}).update({next: step.next})
        await db("steps").where({id: step.next}).update({previous: step.previous})
    } else if (step.previous) {
        await db("steps").where({id: step.previous}).update({next: null})
    } else if (step.next) {
        await db("steps").where({id: step.next}).update({previous: null})
        await db("plays").where({id: step.play_id}).update({head_step: step.next})
    } else {
        await db("plays").where({id: step.play_id}).update({head_step: null})
    }
    await db("steps").where({id}).del()
}

const getStepById = async id => {
    return await db("steps").where({id}).first()
}

const getStepsByPlayId = async play_id => {
    return await db("steps").where({play_id})
}

module.exports = {
    addStep,
    getSteps,
    removeStep,
    getStepById,
    getStepsByPlayId
};