const router = require("express").Router();

const Orgs = require("./orgModel");
const Users = require("../users/userModel")

router.post("/:userId", async (req, res) => {
    const org = req.body;
    const userId = req.params.userId
    try {
      const newOrg = await Orgs.addOrg(org);
      const newOrgUser = await Users.addOrgUser({
        user_id: userId,
        org_id: newOrg[0]
      })
      res.status(201).json({message: "New Org Created", org: newOrg, orgUser: newOrgUser})
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
