const router = require("express").Router();
const bcrypt = require("bcryptjs");

const Users = require("./userModel");
const {verifyUniqueEmailOrgUser} = require("../middlewares");
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

router.post("/:org_id", verifyUniqueEmailOrgUser, async (req, res) => {
    const tempPassword = "ChangeMe"
    const email = req.body.email
    const password = bcrypt.hashSync(tempPassword, 10)

    try {
      const user = await Users.findBy({email})
      let newOrgUser
      let newUser
      let msg
      if(user) {
        newOrgUser = await Users.addOrgUser({
          user_id: user.id,
          org_id: req.params.org_id
        });
        msg = {
          to: req.body.email,
          from: 'ken@hypcycle.com',
          subject: "You've been invited to join Hypcycle",
          html: `Login to your account <a href="https://app.hypcycle.com/#/login>here</a>.`
        }
      } else {
        newUser = await Users.addUser({email: email, password: password});
        newOrgUser = await Users.addOrgUser({
          user_id: newUser[0],
          org_id: req.params.org_id
        });
        msg = {
          to: req.body.email,
          from: 'ken@hypcycle.com',
          subject: "You've been invited to join Hypcycle",
          html: `Login to your account at <a href="https://app.hypcycle.com/#/invite/${req.body.email}/${user ? user.id : newUser[0]}/${req.params.org_id}/${tempPassword}">https://app.hypcycle.com/</a>. Please reset your password when you first login.`
        }
      }
      sgMail.send(msg)
      res.status(201).json({ message: "Added New User", orgUser: newOrgUser});
    } catch (error) {
      res.status(500).json({ message: "Could Not Add New User", error: error });
    }
});

router.post("/orgUser", async (req, res) => {
    const orgUser = req.body;
    try {
        let newOrgUser = await Users.addOrgUser(orgUser);
        res.status(201).json({message: "New OrgUser Created", orgUser: newOrgUser})
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
      const orgUsers = await Users.getOrgUsers(userId);
      res.status(200).json({orgUsers: orgUsers})
    } catch(err) {
      res.status(500).json({message: "Get OrgUser Failed", error: err})
    }
})

router.get("/orgUsers/:orgId", async(req,res) => {
    const orgId = req.params.orgId
    try {
        const orgUsers = await Users.getOrgUsersByOrgId(orgId)
        res.status(200).json({orgUsers: orgUsers})
    } catch(err) {
        res.status(500).json({message: "Get Failed", error: err})
    }
})

router.put("/:user_id", async (req,res) => {
    const user_id = req.params.user_id
    const changes = req.body
    try {
        await Users.updateUser(user_id, changes)
        res.status(201).json({message: "Update Successful"})
    } catch(err) {
      res.status(500).json({message: "Update Failed"})
    }
})

router.put("/password/:user_id", async (req,res) => {
  const user_id = req.params.user_id
  const password = bcrypt.hashSync(req.body.password, 10)
  try {
    await Users.updateUser(user_id, {password})
    res.status(201).json({message: "Password Update Successful"})
  } catch(err) {
    res.status(500).json({message: "Password Update Failed"})
  }
})

router.get("/", async(req,res) => {
  try {
    const users = await Users.getUsers()
    res.status(200).json({users: users})
  } catch(err) {
    res.status(500).json({message: "Get Failed"})
  }
})

router.delete("/:id", async (req,res) => {
  const id = req.params.id
  try {
    await Users.deleteUser(id)
    res.status(201).json({message: "User Deleted"})
  } catch(err) {
    res.status(500).json({message: "Delete Failed"})
  }
})

router.delete("/orgUsers/:id", async (req,res) => {
  const id = req.params.id
  try {
    await Users.deleteOrgUser(id)
    res.status(201).json({message: "OrgUser Deleted"})
  } catch(err) {
    res.status(500).json({message: "Delete Failed"})
  }
})

module.exports = router;
