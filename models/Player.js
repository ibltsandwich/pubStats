const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PlayerSchema = new Schema({
  playerId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
  matches: {
    type: Object,
  },
  time: {
    type: Date,
    default: Date.now,
  }
});

module.exports = Match = mongoose.model('players', PlayerSchema);