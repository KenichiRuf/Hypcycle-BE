const router = require("express").Router();
const bcrypt = require("bcryptjs");

const Users = require("./userModel");
const {verifyUniqueEmail} = require("../middlewares");


router.post("/:org_id", verifyUniqueEmail, async (req, res) => {
  const user = {
    email: req.body.email,
    password: bcrypt.hashSync(Math.random().toString(), 10)
  };

  try {
    const newUser = await Users.addUser(user);
    console.log(newUser)
    const newOrgUser = await Users.addOrgUser({
      user_id: newUser[0],
      org_id: req.params.org_id
    });
    console.log(newOrgUser)
    res.status(201).json({ message: "Added New User", orgUser: newOrgUser});
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Could Not Add New User", error: error });
  }
});

router.post("/orgUser", async (req, res) => {
    const orgUser = req.body;
    try {
        let newOrgUser = await Users.addOrgUser(orgUser);
        res.status(201).json({message: "New OrgUser Created", orgUser: newOrgUser})
    } catch(err) {
      console.log(err)
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

router.get("/orgUsers/:id", async(req,res) => {
    const id = req.params.id
    try {
        const orgUsers = await Users.getOrgUsersByOrgId(id)
        res.status(200).json({orgUsers: orgUsers})
    } catch(err) {
        res.status(500).json({message: "Get Failed", error: err})
    }
})

module.exports = router;
