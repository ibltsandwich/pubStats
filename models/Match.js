const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MatchSchema = new Schema({
  matchId: {
    type: String,
    required: true
  },
  attributes: {
    type: Object,
    required: true,
  },
  rosters: {
    type: Object,
    required: true
  },
  participants: {
    type: Object,
    required: true
  },
  time: {
    type: Date, 
    default: Date.now 
  }
});

module.exports = Match = mongoose.model('matches', MatchSchema);