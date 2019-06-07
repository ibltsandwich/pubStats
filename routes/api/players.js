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
                  'Accept': 'application/json',
                },
            })
            .then((res) => {
              return res.json();
            })
            .then(player => {
              if (player.errors) { return res.status(404).json(player.errors) }

              // const matches = player.data[0].relationships.matches.data;
              // const playerMatches = {};

              // matches.forEach(match => {
              //   fetch(`https://api.pubg.com/shards/steam/matches/${match.id}`, {
              //           method: 'GET',
              //           headers: {
              //             'Accept': 'application/json'
              //           },
              //     })
              //     .then(response => response.json())
              //     .then(matchData => {
              //       const matchInfo = {};
              //       matchInfo.id = matchData.data.id;
              //       matchInfo.attributes = matchData.data.attributes;
              //       matchInfo.rosters = matchData.data.relationships.rosters.data;
      
              //       for (let i = 0; i < matchData.included.length; i += 1) {
              //         const item = matchData.included[i];

              //         if (item.type === "participant") {
              //           if (item.attributes.stats.playerId === player.data[0].id) {
              //             matchInfo.stats = item.attributes.stats;
              //           }
              //         }
              //       };

              //       playerMatches[matchData.data.id] = matchInfo;
              //     });
              // });

              const newPlayer = new Player({
                playerId: player.data[0].id,
                name: player.data[0].attributes.name,
                lowerCaseName: player.data[0].attributes.name.toLowerCase(),
                // matches: playerMatches,
                matches: player.data[0].relationships.matches
              });

              newPlayer
                .save()
                .then(player => res.json({[player.name.toLowerCase()]: player}))
                .catch(err => {
                  return res.status(400).json(err);
                });
            })
            .catch(err => {
              return res.status(404).json(err);
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