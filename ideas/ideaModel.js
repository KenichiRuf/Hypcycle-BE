const db = require("../data/dbConfig.js");

const updateIdea = async (changes, id) => {
    return await db("ideas").where({id}).update(changes)
}

const getIdeasByOrgId = async org_id => {
    let node = await db("ideas").where({org_id: org_id, previous: null}).first()
    let ideas = [node]
    while (node.next) {
        node = await db("ideas").where({id: node.next}).first()
        ideas = [...ideas, node]
    }
    return ideas
}

const removeNode = async idea => {
    if (!idea.previous) {
        await updateIdea({previous: null}, idea.next)
    } else if (!idea.next) {
        await updateIdea({next: null}, idea.previous)
    } else {
        await updateIdea({next: idea.next}, idea.previous)
        await updateIdea({previous: idea.previous}, idea.next)
    }
}

const insertNode = async (idea, reference, head) => {
    if (head) {
        await updateIdea({previous: null, next: reference.id}, idea.id)
        await updateIdea({previous: idea.id}, reference.id)
    } else if (!reference.next) {
        await updateIdea({next: idea.id}, reference.id)
        await updateIdea({previous: reference.id, next: null}, idea.id)
    } else {
        await updateIdea({previous: idea.id}, reference.next)
        await updateIdea({next: idea.id}, reference.id)
        await updateIdea({next: reference.next, previous: reference.id}, idea.id)
    }
    return await getIdeasByOrgId(idea.org_id)
}

const addIdea = async idea => {
    const tail = await db("ideas").where({next: null, org_id: idea.org_id}).first()
    const [newIdea] = await db("ideas").insert(idea);
    if(tail) {
        await updateIdea({next: newIdea}, tail.id)
    }
};

module.exports = {
    addIdea,
    updateIdea,
    getIdeasByOrgId,
    removeNode,
    insertNode
};
