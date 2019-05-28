const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

const Player = require('../../models/Player');
const PUBG_API_KEY = process.env.PUBG_API_KEY;

router.get(`/players/`, (req, res) => {
  Player
    .findOne({ playerId: req.body.playerName })
    .then(player => {
      if (player) {
        return res.json({
          player
        })
      } else {
        fetch(`https://api.pubg.com/shards/steam/players?filter[playerNames]=${req.body.playerName}`, {
                method: 'GET',
                withCredentials: true,
                credentials: 'include',
                headers: {
                  'Authorization': `Bearer ${PUBG_API_KEY}`,
                  'Accept': 'application/json',
                },
            })
            .then(res => {
              return res.json();
            })
            .then(player => {
              const newPlayer = new Player({
                playerId: player.data[0].id,
                name: player.data[0].attributes.name,
                matches: player.data[0].relationships.matches,
              })
              newPlayer
                .save()
                .then(player => res.json(player))
            })
      }
    })
})

module.exports = router;