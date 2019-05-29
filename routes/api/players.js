const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

const Player = require('../../models/Player');
const PUBG_API_KEY = process.env.PUBG_API_KEY;

router.get(`/:playerName`, (req, res) => {
  Player
    .findOne({ lowerCaseName: req.params.playerName })
    .then(player => {
      if (player) {
        return res.json({
          [player.name.toLowerCase()]: player
        })
      } else {
        fetch(`https://api.pubg.com/shards/steam/players?filter[playerNames]=${req.params.playerName}`, {
                method: 'GET',
                headers: {
                  'Authorization': `Bearer ${PUBG_API_KEY}`,
                  'Accept': 'application/json',
                },
            })
            .then((res) => {
              return res.json();
            })
            .then(player => {
              const newPlayer = new Player({
                playerId: player.data[0].id,
                name: player.data[0].attributes.name,
                lowerCaseName: player.data[0].attributes.name.toLowerCase(),
                matches: player.data[0].relationships.matches,
              })
              newPlayer
                .save()
                .then(player => res.json({[player.name.toLowerCase()]: player}))
                .catch(err => {
                  return res.status(400).json(err);
                });
            })
            .catch(err => {
              console.log(err)
              return res.status(404).json(err);
            })
      }
    })
})

module.exports = router;