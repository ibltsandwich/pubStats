const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

const Player = require('../../models/Player');
const PUBG_API_KEY = process.env.PUBG_API_KEY;

router.get(`/:playerName`, (req, res) => {
  Player
    .findOne({ lowerCaseName: req.params.playerName.toLowerCase() })
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
                  'Accept': 'application/vnd.api+json',
                },
            })
            .then((res) => {
              return res.json();
            })
            .then(player => {
              if (player.errors) { 
                return res.status(404).json(player.errors) 
              }

              playerMatches = {};

              player.data[0].relationships.matches.data.forEach(match => {
                playerMatches[match.id] = match;
              });

              console.log(playerMatches)
              const newPlayer = new Player({
                playerId: player.data[0].id,
                name: player.data[0].attributes.name,
                lowerCaseName: player.data[0].attributes.name.toLowerCase(),
                createdAt: player.data[0].attributes.createdAt,
                updatedAt: player.data[0].attributes.updatedAt,
                matches: playerMatches,
              });

              newPlayer
                .save()
                .then(player => res.json({[player.name.toLowerCase()]: player}))
                .catch(err => {
                  return res.status(400).json(err);
                });
            })
      }
    });
});

router.patch(`:/playerName`, (req, res) => {
  Player
    .findOne({ lowerCaseName: req.params.playerName.toLowerCase() })
    .then(player => {
      if (player) {
        player.matches = req.body.playerMatches;
      }
    })
})

module.exports = router;