const router = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const Users = require("../users/userModel");
const Orgs = require("../orgs/orgModel");
const Auth = require("../auth/authModel");
const {verifyUniqueEmail, verifyUniqueOrgName} = require("../middlewares");

router.post("/register", verifyUniqueEmail, verifyUniqueOrgName, async (req, res) => {
  const user = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 10)
  };
  const org = {
    name: req.body.companyName,
    plan: "free",
    users: 1
  }
  try {
    const newUser = await Users.addUser(user)
    const newOrg = await Orgs.addOrg(org)
    console.log(newUser, newOrg)
    const newOrgUser = await Auth.addOrgUser(newUser, newOrg)
    res.status(201).json({message: "Registration Successful", userId: newUser[0], orgId: newOrg[0], orgUserId: newOrgUser[0]})
  } catch(err) {
    res.status(500).json({message: "Registration Failed", error: err})
  }
});

router.post("/login", async (req, res) => {
  let { email, password } = req.body;
  try {
    const user = await Users.findBy({ email });
    console.log(user)
    if (user && bcrypt.compareSync(password, user.password)) {
      const token = genToken(user);
      res.status(200).json({
        message: `Login Successful!`,
        userId: user.id,
        token
      });
    } else {
      res.status(401).json({ message: "Invalid Credentials" });
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Error logging in user", error: error });
  }
});

const genToken = user => {
  const payload = {
    subject: "user",
    user: user
  };

  const secret = process.env.JWT_SECRET;

  const options = {
    expiresIn: "1h"
  };

  return jwt.sign(payload, secret, options);
};

module.exports = router;
