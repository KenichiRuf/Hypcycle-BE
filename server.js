const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const authRouter = require("./auth/authRouter");
const userRouter = require("./users/userRouter");
const goalRouter = require("./goals/goalRouter");
const orgRouter = require("./orgs/orgRouter");
const ideaRouter = require("./ideas/ideaRouter");
const experimentRouter = require("./experiments/experimentRouter");
const playRouter = require("./plays/playRouter");
const dashboardRouter = require("./dashboard/dashboardRouter");
const tagRouter = require("./tags/tagRouter");
const playbookRouter = require("./playbooks/playbookRouter");
const stepRouter = require("./steps/stepRouter");

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use("/api/auth", authRouter);
server.use("/api/users", userRouter);
server.use("/api/goals", goalRouter);
server.use("/api/orgs", orgRouter);
server.use("/api/ideas", ideaRouter);
server.use("/api/experiments", experimentRouter);
server.use("/api/plays", playRouter);
server.use("/api/dashboard", dashboardRouter);
server.use("/api/tags", tagRouter);
server.use("/api/playbooks", playbookRouter);
server.use("api/steps", stepRouter);

server.get("/", (req, res) => {
  res.send("<h1>Backend API for Hypcycle</h1>");
});

module.exports = server;
