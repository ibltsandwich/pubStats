const express = require('express');
const router = express.Router();

const Match = require('../../models/Match');

router.get(`/:matchId`, (req, res) => {
  const matchId = req.params.matchId;
  Match
    .findOne({ matchId: req.params.matchId })
    .then(match => {
      if (match) {
        return res.json({ [matchId]: match });
      } else {
        return res.status(404).json({"Not Found": "Sorry this match doesn't exist in our database :("});
      }
    })
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