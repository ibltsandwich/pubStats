const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MatchSchema = new Schema({
  gameMode: {
    type: String,
    required: true
  },
  mapName: {
    type: String,
  },
  isCustomMatch: {
    type: Boolean,
  },
  shardId: {
    type: String,
    required: true
  },
  duration: {
    type: Integer,
    required: true
  },
  createdAt: {
    type: String,
    required: true
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
})

module.exports = Match = mongoose.model('matches', MatchSchema);