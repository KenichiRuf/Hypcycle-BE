const router = require("express").Router();

const Playbooks = require("./playbookModel");

router.post("/", async (req, res) => {
    const playbook = req.body;
    try {
      const [newPlaybook] = await Playbooks.addPlaybook(playbook);
      res.status(201).json({message: "New Playbook Created", playbook: {...playbook, id: newPlaybook}})
    } catch(err) {
      res.status(500).json({message: "Could Not Create New Playbook", error: err})
    }
})

router.get("/:orgId", async (req,res) => {
    const orgId = req.params.orgId
    try {
        const playbooks = await Playbooks.getByOrgId(orgId);
        res.status(200).json({playbooks: [...playbooks]})
    } catch(err) {
        res.status(500).json({message: "Get Failed", error: err})
    }
})

module.exports = router;
