const router = require("express").Router();

const Ideas = require("./ideaModel");
const Tags = require("../tags/tagModel");

router.post("/", async (req, res) => {
    const idea = req.body;
    try {
        const newIdea = await Ideas.addIdea(idea);
        res.status(201).json({message: "New idea Created", idea: newIdea})
    } catch(err) {
        res.status(500).json({message: "Could Not Create New Idea", error: err})
    }
})

router.put("/:ideaId", async (req,res) => {
    const ideaId = req.params.ideaId
    const changes = req.body
    try {
        await Ideas.updateIdea(changes, ideaId);
        res.status(200).json({message: "Update Successful"})
    } catch(err) {
        res.status(500).json({message: "Update Failed", error: err})
    }
})

router.get("/:orgId", async (req,res) => {
    const orgId = req.params.orgId
    try {
        const ideas = await Ideas.getIdeasByOrgId(orgId);
        res.status(200).json({ideas: [...ideas]})
    } catch(err) {
        res.status(500).json({message: "Get Failed", error: err})
    }
})

router.put("/move", async (req,res) => {
    const idea = req.body.idea
    const reference = req.body.reference
    const head = req.body.head

    try {
        await Ideas.removeNode(idea)
        const ideas = await Ideas.insertNode(idea, reference, head)
        res.status(201).json({message: "Successfully Moved Node", ideas: ideas})
    } catch(err) {
        res.status(500).json({message: "Could Not Move Node", error: err})
    }
})

router.get("/", async (req,res) => {
    try {
        const ideas = await Ideas.getIdeas(1)
        const ideaTags = await Ideas.getIdeaTagsByOrgId(1)
        const tags = await Tags.getTags()
        res.status(200).json({
            ideas: [...ideas],
            ideaTags: [...ideaTags],
            tags: [...tags]
        })
    } catch(err) {
        res.status(500).json({message: "Get Failed", error: err})
    }
})

router.get("/goal/:goalId", async (req,res) => {
    const goalId = req.params.goalId
    try {
        const ideas = await Ideas.getIdeasByGoalId(goalId)
        res.status(200).json({ideas: ideas})
    } catch(err) {
        res.status(500).json({message: "Could Not Get Ideas"})
    }
})

module.exports = router;