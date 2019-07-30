const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

const Player = require('../../models/Player');
const PUBG_API_KEY = process.env.PUBG_API_KEY;
const matchesAPI = 'https://api.pubg.com/shards/psn/matches/';

router.route(`/:playerName`)
  .get((req, res) => {
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

                  // playerMatches[match.id] = Object.assign(createMatchData, matchInfo);
                });

                if (Object.values.length(playerMatches) === player.data[0].relationships.matches.data.length) {
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
                }
              })
        }
      });
  })
  .patch((req, res) => {
    Player
        .findOne({ lowerCaseName: req.body.playerName.toLowerCase() }, (err, player) => {
          for (let matchId in req.body.matches) {
            player.matches[matchId] = req.body.matches[matchId];
          }

          

          fetch(`https://api.pubg.com/shards/steam/players?filter[playerNames]=${req.body.playerName}`, {
                  method: 'GET',
                  headers: {
                    'Authorization': `Bearer ${PUBG_API_KEY}`,
                    'Accept': 'application/vnd.api+json',
                  },
            })
            .then(res => res.json())
            .then(fetchedPlayer => {
              fetchedPlayer.data[0].relationships.matches.data.forEach(match => {
                if (player.matches[match.id] === undefined) {
                  player.matches[match.id] = match;
                }
              });
              player.updatedAt = fetchedPlayer.data[0].attributes.updatedAt;
              player.markModified('matches');
              player.markModified('updatedAt');
              player
                .save()
                .then(player => {
                  return res.json({ [player.name.toLowerCase()]: player });
                });
          });

          // fetch(`https://api.pubg.com/shards/steam/players/${}/seasons/${seasonId}`, {
          //       method: 'GET',
          //       headers: {
          //         'Authorization': `Bearer ${PUBG_API_KEY}`,
          //         'Accept': 'application/vnd.api+json',
          //       },
          // });
        });
  });

// function retrieveMatches(match, player) {
//   fetch(matchesAPI + match.id, {
//     method: 'GET',
//     headers: {
//       'Accept': 'application/vnd.api+json',
      
//     },
//   })
//   .then(response => {
//     return response.json();
//   })
//   .then(matchData => {
//     const matchInfo = {};

//     const createMatchData = {};
//     createMatchData.matchId = matchData.data.id;
//     createMatchData.attributes = matchData.data.attributes;
//     createMatchData.rosters = {};
//     createMatchData.participants = {};
    
//     let participantId;
//     let team;
//     const teamInfo = {};

//     for (let i = 0; i < matchData.included.length; i += 1) {
//       const item = matchData.included[i];
//       const playerId = player.id;

//       if (item.type === "participant") {
//         createMatchData.participants[item.id] = item;
//         matchInfo.participants[item.id] = item;

//         if (item.attributes.stats.playerId === playerId) {
//           participantId = item.id
//           matchInfo.stats = item.attributes.stats;
//         };
//       };
//     };

//     for (let i = 0; i < matchData.included.length; i += 1) {
//       const item = matchData.included[i];

//       if (item.type === "roster") {
//         createMatchData.rosters[item.id] = item;

//         item.relationships.participants.data.forEach(member => {
//           if (member.id === participantId) {
//             team = item.relationships.participants.data;
//           };
//         });
//       };
//     };

//     team.forEach(member => {
//       for (let i = 0; i < matchData.included.length; i += 1) {
//         const item = matchData.included[i];

//         if (item.type === "participant") {
//           if (item.id === member.id) {
//             teamInfo[item.attributes.stats.playerId] = item.attributes.stats;
//           };
//         };
//       };
//     });

//     matchInfo.team = teamInfo;
//     matchInfo.fetched = true;



//     const newMatch = new Match({
//       matchId: createMatchData.matchId,
//       attributes: createMatchData.attributes,
//       rosters: createMatchData.rosters,
//       participants: createMatchData.participants
//     });

//     newMatch.save();
//   })
// }


module.exports = router;