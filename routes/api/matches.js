const express = require('express');
const router = express.Router();

const Match = require('../../models/Match');

router.get(`/matches/:matchId`, (req, res) => {
  Match.findOne({ matchId: req.body.matchId })
    .then(match => {
      return res.json({
        [matchId]: match
      });
    });
});

router.post(`/`, (req, res) => {
  const matchData = req.body;

  const newMatch = new Match({
    matchId: matchData.matchId,
    attributes: matchData.attributes,
    rosters: matchData.rosters,
    participants: matchData.participants,
  })

  newMatch
    .save()
    .then(match => res.json({[match.matchId]: match}))
})

module.exports = router;