const router = require("express").Router();

const Dashboard = require("./dashboardModel");

router.get("/:orgId", async (req, res) => {
    const orgId = req.params.orgId
    try {
        const data = await Dashboard.getDashboardData(orgId)
        res.status(200).json({data: data})
    } catch(err) {
        res.status(500).json({message: "Get Failed"})
    }
})

module.exports = router;