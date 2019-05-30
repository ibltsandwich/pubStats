import React from 'react';
import { connect } from 'react-redux';

import { fetchPlayer } from '../../actions/player_actions';

const API = 'https://api.pubg.com/shards/steam/matches/';

const msp = (state, ownProps) => {
  const player = state.entities.players[ownProps.match.params.playerName.toLowerCase()];
  return {
    player
  };
};

const mdp = dispatch => {
  return {
    fetchPlayer: playerName => dispatch(fetchPlayer(playerName))
  };
}

class PlayerStats extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    this.props.fetchPlayer(this.props.match.params.playerName.toLowerCase());
  }

  componentDidUpdate(oldProps) {
    if (Object.values(this.state).length === 0) {
      this.props.player.matches.data.forEach(match => {
        fetch(API + match.id , {
                method: 'GET',
                headers: {
                  'Accept': 'application/json'
                },
          })
          .then(response => response.json())
          // .then(data => this.setState({ [match.id]: data }))
          .then(matchData => {
            const matchInfo = {};
            matchInfo.id = matchData.data.id;
            matchInfo.attributes = matchData.data.attributes;
            matchInfo.rosters = matchData.data.relationships.rosters.data;

            for (let i = 0; i < matchData.included.length; i += 1) {
              const item = matchData.included[i];
              if (item.type === "participant") {
                if (item.attributes.stats.playerId === this.props.player.playerId) {
                  matchInfo.stats = item.attributes.stats;
                  return this.setState({ [match.id]: matchInfo })
                }
              }
            }
          })
      })
    }
  }

  render() {
    if(this.props.player) {
      const { player } = this.props;
      const updated = new Date(Date.parse(player.time));
      const sortedHistory = Object.values(this.state).sort((a, b) => 
        new Date(b.attributes.createdAt) - new Date(a.attributes.createdAt)
      )

      const matchHistory = sortedHistory.map((match,idx) => {
        const gameDate = new Date(match.attributes.createdAt).toLocaleString();
        const survivalMinutes = Math.floor(match.stats.timeSurvived / 60);
        const survivalSeconds = Math.round(((match.stats.timeSurvived / 60) % 1) * 60);
        
        return (
          <li id="player-match" key={idx}>
            {/* <h1>Match: {match.id}</h1> */}
            <div className="match-attributes">
              <h2>Played: {gameDate}</h2>
              <h2>Game Mode: {match.attributes.gameMode.toUpperCase()}</h2>
            </div>
            <h1>Win Place: {match.stats.winPlace + "/" + match.rosters.length}</h1>
            <h3>Time Survived: {survivalMinutes + ":"}{survivalSeconds < 10 ? ("0" + survivalSeconds) : survivalSeconds}</h3>
            <span>Damage Dealt: {match.stats.damageDealt.toFixed(2)}</span>
            <span>Kills: {match.stats.kills}</span>
          </li>
        )
      });

      return(
        <div className="player-stats-container">
          <header className="player-header">
            <h1>{player.name}</h1>
            <h3>Last Updated: {updated.toLocaleString()}</h3>


          </header>
          <main className="player-match-history">
            <ul className="player-match-history-list">
              {matchHistory}
            </ul>
          </main>
        </div>

      )
    } else {
      return(
        <h1>Loading</h1>
      )
    }
  }
}

export default connect(msp, mdp)(PlayerStats);