const router = require("express").Router();
const bcrypt = require("bcryptjs");

const Users = require("./userModel");
const {verifyUniqueEmailOrgUser} = require("../middlewares");
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

router.post("/:org_id", async function (req, res) {
  verifyUniqueEmailOrgUser(req.params.org_id, req, res)},
  async function(req,res){ 
  const tempPassword = "hamburger"
  const user = {
    email: req.body.email,
    password: bcrypt.hashSync(tempPassword, 10)
  };

  try {
    const newUser = await Users.addUser(user);
    const newOrgUser = await Users.addOrgUser({
      user_id: newUser[0],
      org_id: req.params.org_id
    });
    const msg = {
      to: req.body.email,
      from: 'ken@hypcycle.com',
      subject: "You've been invited to join Hypcycle",
      html: `Login to your account at <a href="https://app.hypcycle.com/reset-password/${req.body.email}/${newUser[0]}/${tempPassword}">https://app.hypcycle.com/reset-password</a>. Please reset your password when you first login.`
    }
    sgMail.send(msg)
      .then(() => console.log("email sent"))
      .catch((error) => console.error(error))
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
      console.log(err)
      res.status(500).json({message: "Get OrgUser Failed", error: err})
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

module.exports = router;
