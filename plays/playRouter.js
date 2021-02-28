const router = require("express").Router();

const Plays = require("./playModel");

router.post("/", async (req, res) => {
    const play = req.body;
    try {
      const [newPlay] = await Plays.addPlay(play);
      res.status(201).json({message: "New Play Created", play: {...play, id: newPlay}})
    } catch(err) {
      res.status(500).json({message: "Could Not Create New Play", error: err})
    }
})

router.get("/:playbookId", async (req,res) => {
    const playbookId = req.params.playbookId
    try {
        const plays = await Plays.getByPlaybookId(playbookId);
        res.status(200).json({plays: [...plays]})
    } catch(err) {
        res.status(500).json({message: "Get Failed", error: err})
    }
})

router.get("/play/:id", async (req,res) => {
  const id = req.params.id
  try {
      const data = await Plays.getById(id);
      res.status(200).json({play: data.play, steps: data.steps})
  } catch(err) {
      res.status(500).json({message: "Get Failed", error: err})
  }
})

module.exports = router;
