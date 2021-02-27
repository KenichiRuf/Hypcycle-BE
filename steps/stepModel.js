const db = require("../data/dbConfig.js");

const insertStep = async (step, location) => {
    const tail = await db("steps").where({play_id: step.play_id, next: null}).returning("id")
    const newStep = await db("steps").insert(step).returning("id").first()
    if(tail) {
        await db("steps").update({next: newStep}, tail)
    }
    return db("steps").where({id: newStep}).first()
};

const getByPlayId = async play_id => {
    let node = await db("steps").where({play_id: play_id, previous: null}).first()
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

module.exports = {
    insertStep,
    getByPlayId
};