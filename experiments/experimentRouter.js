const router = require("express").Router();

const Experiments = require("./experimentModel");

router.post("/", async (req, res) => {
    const experiment = req.body;
    try {
        const newExperiment = await Experiments.addExperiment(experiment);
        res.status(201).json({message: "New Experiment Created", experiment: newExperiment})
    } catch(err) {
        res.status(500).json({message: "Could Not Create New Experiment", error: err})
    }
})

router.put("/:id", async (req,res) => {
    const changes = req.body;
    const id = req.params.id;
    try {
        await Experiments.updateExperiment(changes, id);
        res.status(201).json({message: "Expriment Updated"})
    } catch(err) {
        res.status(500).json({message: "Update Failed", error: err})
    }
})

router.get("/:orgId", async (req, res) => {
    const orgId = req.params.orgId
    try {
        const experiments = await Experiments.getByOrgId(orgId)
        console.log(experiments)
        res.status(200).json({experiments: experiments})
    } catch(err) {
        res.status(500).json({message: "Get Failed"})
    }
})

router.get("/goal/:goalId", async (req, res) => {
    const goalId = req.params.goalId
    try {
        const experiments = await Experiments.getByGoalId(goalId)
        res.status(200).json({experiments: experiments})
    } catch(err) {
        res.status(500).json({message: "Could Not Get Experiments", error: err})
    }
})

module.exports = router;