const router = require("express").Router();

const Goals = require("./goalModel");

router.post("/", async (req, res) => {
    const goal = req.body;
    try {
      const [newGoal] = await Goals.addGoal(goal);
      res.status(201).json({message: "New Goal Created", goal: {...goal, id: newGoal}})
    } catch(err) {
      res.status(500).json({message: "Could Not Create New Goal", error: err})
    }
})

router.put("/:goalId", async (req,res) => {
    const goalId = req.params.goalId
    const changes = req.body
    try {
        await Goals.updateGoal(changes, goalId);
        res.status(200).json({message: "Update Successful"})
    } catch(err) {
        res.status(500).json({message: "Update Failed", error: err})
    }
})

router.get("/:orgId", async (req,res) => {
    const orgId = req.params.orgId
    try {
        const goals = await Goals.getGoalsByOrgId(orgId);
        res.status(200).json({goals: [...goals]})
    } catch(err) {
        res.status(500).json({message: "Get Failed", error: err})
    }
})

router.get("/", async (req,res) => {
    try {
        const goals = await Goals.getGoalsByOrgId(0)
        res.status(200).json({goals: [...goals]})
    } catch(err) {
        res.status(500).json({message: "Get Failed", error: err})
    }
})

module.exports = router;
