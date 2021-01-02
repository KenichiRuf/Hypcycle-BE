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
        res.status(200).json({experiments: experiments})
    } catch(err) {
        console.log(err)
        res.status(500).json({message: "Get Failed"})
    }
})

module.exports = router;