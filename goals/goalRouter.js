const router = require("express").Router();

const Goals = require("./goalModel");
const Tags = require("../tags/tagModel");

router.post("/", async (req, res) => {
    const goal = req.body;
    try {
      const newGoal = await Goals.addGoal(goal);
      res.status(201).json({message: "New Goal Created", goal: {...goal, id: newGoal[0]}})
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
        const goals = await Goals.getGoalsByOrgId(1)
        const goalTags = await Goals.getGoalTagsByOrgId(1)
        const tags = await Tags.getTags()
        res.status(200).json({
            goals: [...goals],
            goalTags: [...goalTags],
            tags: [...tags]
        })
    } catch(err) {
        res.status(500).json({message: "Get Failed", error: err})
    }
})

router.delete("/:id", async (req,res) => {
    const id = req.params.id
    try {
        await Goals.deleteGoal(id)
        res.status(200).json({message: "Goal Deleted"})
    } catch(err) {
        res.status(500).json({message: "Delete Goal Error", error: err})
    }
})

module.exports = router;
