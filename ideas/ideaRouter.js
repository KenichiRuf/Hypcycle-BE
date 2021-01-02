const router = require("express").Router();

const Ideas = require("./ideaModel");

router.post("/", async (req, res) => {
    const idea = req.body;
    try {
        const newIdea = await Ideas.addIdea(idea);
        res.status(201).json({message: "New idea Created", idea: newIdea})
    } catch(err) {
        res.status(500).json({message: "Could Not Create New Idea", error: err})
    }
})

router.put("/edit/:ideaId", async (req,res) => {
    const ideaId = req.params.ideaId
    const changes = req.body
    try {
        await Ideas.updateidea(changes, ideaId);
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

module.exports = router;