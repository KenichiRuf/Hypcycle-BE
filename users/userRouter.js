const router = require("express").Router();

const Users = require("./userModel");

router.post("/", async (req, res) => {
    const user = req.body;
    try {
      await Users.addUser(user);
      res.status(201).json({message: "New User Created", user: user})
    } catch(err) {
      res.status(500).json({message: "Could Not Create New User", error: err})
    }
  })

router.post("/orgUser", async (req, res) => {
    const orgUser = req.body;
    try {
        await Users.addOrgUser(orgUser);
        res.status(201).json({message: "New OrgUser Created", orgUser: orgUser})
    } catch(err) {
        res.status(500).json({message: "Could Not Create OrgUser", error: err})
    }
})

router.get("/:userId", async (req, res) => {
  const id = req.params.userId
  try {
    const user = await Users.findBy({id})
    res.status(200).json({user: user})
  } catch(err) {
    res.status(500).json({message: "Get User Failed", error: err})
  }
})

router.get("/orgUser/:userId", async (req,res) => {
    const userId = req.params.userId
    try {
      const orgUsers = await Users.getOrgUser(userId);
      res.status(200).json({orgUsers: orgUsers})
    } catch(err) {
      console.log(err)
      res.status(500).json({message: "Get OrgUser Failed", error: err})
    }
})

router.get("/orgUser", async(req,res) => {
    try {
      const orgUsers = await Users.getOrgUsers();
      res.status(200).json({orgUsers: orgUsers})
    } catch(err) {
      res.status(500).json({message: "Get OrgUsers Failed", error: err})
    }
})

module.exports = router;
