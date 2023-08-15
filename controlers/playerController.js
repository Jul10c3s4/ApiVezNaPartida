const express = require("express");
const router = express()
const mongoose = require("mongoose");
require("../models/player");
const Player = mongoose.model("players");


exports.create = async (req, res) => {
  const { name, gamesPlayed, victories } = req.body
  const imagePlayer = req.file.path
  if (!name) {
    res.status(422).json({ error: "o nome é necessário!" })
    return
  }
  if (!imagePlayer) {
    res.status(422).json({ error: "o imagePlayer é necessário!" })
    return
  }
  if (!gamesPlayed) {
    res.status(422).json({ error: "a gamesPlayed é necessária!" })
    return
  }

  if (!victories) {
    res.status(422).json({ error: "a victories é necessária!" })
    return
  }



  const playered = {
    name,
    imagePlayer,
    gamesPlayed,
    victories
  }

  try {
    const player = await Player.findOne({ name: name, imagePlayer: imagePlayer})
    if (player) {
      res.status(409).json({ messagem: "Esse jogador já está na nuvem!" })
      return
    }
    await Player.create(playered)

    res.status(201).json({ message: "jogador criado" })
  } catch (erro) {
    res.status(500).json({ erro: erro })
  }
}