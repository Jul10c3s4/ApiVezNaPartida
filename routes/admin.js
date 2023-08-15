const express = require("express");
const router = express()
const mongoose = require("mongoose");
require("../models/player");
const Player = mongoose.model("players");

const upload = require("../config/multer")
const PlayerController = require("../controlers/playerController")

router.get("/", (req, res) => {
  Player.find().then((data) => {
    res.status(200).json([...data])
  }).catch((error) => {
    res.status(500).json({ erro: error })
  })
})

router.post("/add", upload.single("file"), PlayerController.create)

router.put("/:name/:imagePlayer", async (req, res) => {
  const Name = req.params.name
  const ImagePlayer = req.params.imagePlayer

  const { name, imagePlayer, gamesPlayed, victories } = req.body

  const player = {
    name,
    imagePlayer,
    gamesPlayed,
    victories
  }

  try {
    const updatedPlayer = await Player.updateOne({ name: Name, imagePlayer: ImagePlayer }, player)
    console.log(updatedCard)

    if (updatedPlayer.matchedCount === 0) {
      res.status(422).json({ message: "jogador não encontrado!" })
      return
    }
    res.status(200).json(player)
  } catch (error) {
    res.status(500).json({ erro: error })
  }
})

router.delete("/:name/:imagePlayer", async (req, res) => {
  //const titulo = req.params.titulo
  const name = req.params.name
  const imagePlayer = req.params.imagePlayer

  const player = await Player.findOne({ name: name, imagePlayer: imagePlayer })
  if (!player) {
    res.status(422).json({ messagem: "jogador não encontrado!" })
    return
  }
  try {
    await Player.deleteOne({ name: name, imagePlayer: imagePlayer })
    res.status(200).json({ messagem: "jogador removido!" })
  } catch (error) {
    res.status(500).json({ erro: error })
  }
})

module.exports = router