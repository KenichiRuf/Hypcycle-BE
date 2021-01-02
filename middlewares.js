const Users = require('./users/userModel.js');
const Orgs = require('./orgs/orgModel');
const jwt = require('jsonwebtoken');

module.exports = {
    validateUserId,
    authorizeUser,
    verifyUniqueEmail,
    verifyUniqueOrgName
}

async function verifyUniqueEmail(req, res, next) {
    const email = req.body.email
    try {
        const user = await Users.findBy({email})
        if(user) {
            res.status(400).json({message: "Email Already In Use"})
        } else {
            next();
        }
    } catch(error) {
        res.status(500).json({message: "verifyUniqueEmail Error", error: error})
    }
}

async function verifyUniqueOrgName(req, res, next) {
    const name = req.body.companyName
    try {
        const org = await Orgs.findBy({name})
        if(org) {
            res.status(400).json({message: "Org Name Already Taken"})
        } else {
            next();
        }
    } catch(error) {
        res.status(500).json({message: "verifyUniqueOrgName Error", error: error})
    }
}

async function validateUserId(req, res, next) { //middlware for validating userID
    const { userId } = req.params;
    try {
        const user = await Users.getUserBy({ id: userId });
        if (user) {
            req.user = user;
            next();
        } else {
            res.status(400).json({ message: `User with Id: ${id} does not exist` })
        }
    }
    catch (error) {
        res.status(500).json({ message: "validateUserId Error", error: error })
    }
}

function authorizeUser(req, res, next) { //middleware for authorization
    const authorization = req.headers.authorization;

    if(authorization) {
        jwt.verify(authorization, secrets.jwtSecret, (err, decodedToken) => {
            if(err) {
                res.status(401).json({message: 'unauthorized token'});
            } else { 
                req.decodedJwt = decodedToken;
                next();
            }
        })
    } else {
        res.status(401).json({message: 'no auth token'});
    }
};