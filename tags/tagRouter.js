const router = require("express").Router();

const Tags = require("./tagModel");

router.post("/", async (req, res) => {
    const tag = req.body;
    try {
      const [newTag] = await Tags.addTag(tag);
      res.status(201).json({message: "New Tag Created", tag: {...tag, id: newTag}})
    } catch(err) {
      res.status(500).json({message: "Could Not Create New Tag", error: err})
    }
})

router.get("/", async (req, res) => {
    try {
        const tags = await Tags.getTags();
        res.status(200).json({tags: tags})
    } catch(err) {
        res.status(500).json({message: "Could Not Get Tags", error: err})
    }
})

router.post("/goal", async (req, res) => {
    const goal_id = req.body.goal_id
    const tag_id = req.body.tag_id

    try {
        const goalTag = await Tags.addGoalTag(goal_id, tag_id)
        res.status(201).json({goal_tag: goalTag})
    } catch(err) {
        res.status(500).json({message: "Could Not Create GoalTag", error: err})
    }
})

router.post("/idea", async (req, res) => {
    const idea_id = req.body.idea_id
    const tag_id = req.body.tag_id

    try {
        const ideaTag = await Tags.addIdeaTag(idea_id, tag_id)
        res.status(201).json({idea_tag: ideaTag})
    } catch(err) {
        res.status(500).json({message: "Could Not Create IdeaTag", error: err})
    }
})

module.exports = router;
