const router = require("express").Router();

const Orgs = require("./orgModel");

router.post("/org", async (req, res) => {
    const org = req.body;
    try {
      await Orgs.addOrg(org);
      res.status(201).json({message: "New Org Created", org: org})
    } catch(err) {
      res.status(500).json({message: "Could Not Create New Org", error: err})
    }
})

router.get("/:orgId", async (req, res) => {
  const id = req.params.orgId
  try {
    const org = await Orgs.findBy({id})
    res.status(200).json({org: org})
  } catch(err) {
    res.status(500).json({message: "Get Org Failed", error: err})
  }
})

module.exports = router;
