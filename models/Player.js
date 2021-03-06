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
    },
    lowerCaseName: {
      type: String,
      required: true,
      index: true,
    },
    matches: {
      type: Object,
    },
    seasonStats: {
      type: Object,
    },
    createdAt: {
      type: String,
      required: true,
    },
    updatedAt: {
      type: String,
      required: true,
    },
    time: {
      type: Date,
      default: Date.now,
    },
  },
  { minimize: false }
);

module.exports = Player = mongoose.model('players', PlayerSchema);