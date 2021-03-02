const router = require("express").Router();

const Steps = require("./stepModel");

router.post("/", async (req, res) => {
    const step = req.body
    try {
        const newStep = await Steps.addStep(step);
        res.status(201).json({message: "New Step Created", step: newStep})
    } catch(err) {
        console.log(err)
        res.status(500).json({message: "Could Not Create New Step", error: err})
    }
})

router.get("/:head", async (req,res) => {
    const head = req.params.head
    try {
        const steps = await Steps.getSteps(head);
        res.status(200).json({steps: steps})
    } catch(err) {
        res.status(500).json({message: "Get Failed", error: err})
    }
})

router.delete("/:id", async (req,res) => {
    const id = req.params.id
    try {
        await Steps.removeStep(id)
        res.status(201).json({message: "Delete Successful"})
    } catch(err) {
        res.status(500).json({message: "Delete Failed", error: err})
    }
})

router.get("/step/:id", async (req,res) => {
    const id = req.params.id
    try {
        const step = await Steps.getStepById(id);
        res.status(200).json({step: step})
    } catch(err) {
        res.status(500).json({message: "Get Failed", error: err})
    }
})

router.get("/play/:id", async (req,res) => {
    const playId = req.params.id
    try {
        const steps = await Steps.getStepsByPlayId(playId)
        res.status(200).json({steps: steps})
    } catch(err) {
        res.status(500).json({message: "Get Failed", error: err})
    }
})

module.exports = router;
