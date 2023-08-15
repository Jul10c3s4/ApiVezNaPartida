const mongoose = require("mongoose")

const PlayerSchema = mongoose.Schema({

  name: {
    type: String,
    required: true
  },

  imagePlayer: {
    type: String,
    required: true
  },

  gamesPlayed: {
    type: Number,
    required: true
  },
  
  victories: {
    type: Number,
    required: true
  }
})

mongoose.model("players", PlayerSchema)

const player = mongoose.model("players")

module.exports = player
