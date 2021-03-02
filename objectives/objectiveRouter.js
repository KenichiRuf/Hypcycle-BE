const router = require("express").Router();

const Objectives = require("./objectiveModel");

router.post("/", async (req, res) => {
    const objective = req.body;
    try {
        const [newObjective] = await Objectives.addObjective(objective);
        res.status(201).json({message: "New Objective Created", objective: {...objective, id: newObjective}})
    } catch(err) {
        res.status(500).json({message: "Could Not Create New Objective", error: err})
    }
})

router.get("/:playbookId", async (req,res) => {
    const playbookId = req.params.playbookId
    try {
        const objectives = await Objectives.getByPlaybookId(playbookId);
        res.status(200).json({objectives: [...objectives]})
    } catch(err) {
        res.status(500).json({message: "Get Failed", error: err})
    }
})

module.exports = router;