const express = require('express');
const router = express.Router();

const Match = require('../../models/Match');

router.get(`/matches/${matchId}`, (req, res) => {
  Match.findOne({ shardId: req.body.matchId })
    .then(match => {
      return res.json({
        matchId: match
      });
    });
});