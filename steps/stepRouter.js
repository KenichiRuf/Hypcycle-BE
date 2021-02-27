const router = require("express").Router();

const Steps = require("./stepModel");

router.post("/", async (req, res) => {
    const step = req.body;
    try {
      const newStep = await Steps.addStep(step);
      res.status(201).json({message: "New Step Created", step: newStep})
    } catch(err) {
      res.status(500).json({message: "Could Not Create New Step", error: err})
    }
})

router.get("/:playId", async (req,res) => {
    const playId = req.params.playId
    try {
        const steps = await Plays.getByPlayId(playId);
        res.status(200).json({steps: steps})
    } catch(err) {
        res.status(500).json({message: "Get Failed", error: err})
    }
})

module.exports = router;
