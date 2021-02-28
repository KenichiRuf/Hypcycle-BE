const db = require("../data/dbConfig.js");

const addStep = async (step) => {
    const tail = await db("steps").where({play_id: step.play_id, next: null}).first()
    const [newStep] = await db("steps").insert(step).returning("id")
    console.log(tail)
    if(tail.id) {
        await db("steps").where({id: tail.id}).update({next: newStep})
    } else {
        await db("plays").where({id: step.play_id}).update({head_step: newStep})
    }
    return db("steps").where({id: newStep}).first()
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
    // let step = await db("steps").where({id}).first()
    // const next = step.next
    // let prev = await 
    await db("steps").where({id}).del()
}

module.exports = {
    addStep,
    getSteps,
    removeStep
};