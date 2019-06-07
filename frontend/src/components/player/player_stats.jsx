import React from 'react';
import { connect } from 'react-redux';

import { fetchPlayer } from '../../actions/player_actions';
import { removeErrors } from '../../util/session_api_util';

const API = 'https://api.pubg.com/shards/steam/matches/';

const msp = (state, ownProps) => {
  const player = state.entities.players[ownProps.match.params.playerName.toLowerCase()];
  const errors = state.errors;
  return {
    player,
    errors
  };
};

const mdp = dispatch => {
  return {
    fetchPlayer: playerName => dispatch(fetchPlayer(playerName)),
    removeErrors: () => dispatch(removeErrors()),
  };
}

class PlayerStats extends React.Component {
  constructor(props) {
    super(props);

    this.state = { loading: true, matches: {} };
  }

  componentDidMount() {
    this.props.fetchPlayer(this.props.match.params.playerName);
  }

  componentDidUpdate(oldProps) {
    if (this.props.errors.length === 0) {
      if (Object.values(this.state.matches).length === 0) {
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
                    return this.setState(state => {
                      return { matches: Object.assign(state.matches, {[match.id]: matchInfo})}
                    });
                  }
                }
              }
            });
        });
      }
      if (this.state.loading) {
        if (this.props.player.matches.data.length === Object.values(this.state.matches).length) {
          this.setState({ loading: false });
        }
      }
    } 
  }

  componentWillUnmount() {
    this.props.removeErrors();
  }

  render() {
    if (this.props.errors.length > 0) {
      return (
        <div className="player-errors">
          <h1 className="player-error-title">{this.props.errors[0].title}</h1>
          <h2 className="player-error-detail">{this.props.errors[0].detail}</h2>
        </div>
      )
    }
    if(this.props.player) {
      const { player } = this.props;
      const updated = new Date(Date.parse(player.time));
      const sortedHistory = Object.values(this.state.matches).sort((a, b) => 
        new Date(b.attributes.createdAt) - new Date(a.attributes.createdAt)
      ).slice(0, 29);
      let matchHistory;

      if (!this.state.loading) {
        matchHistory = sortedHistory.map((match,idx) => {
          const gameDate = new Date(match.attributes.createdAt).toLocaleString();
          const survivalMinutes = Math.floor(match.stats.timeSurvived / 60);
          const survivalSeconds = Math.round(((match.stats.timeSurvived / 60) % 1) * 60);

          return (
            <li id="player-match" key={idx}>
              {/* <h1>Match: {match.id}</h1> */}
              <div className="match-attributes">
                <h2>{gameDate}</h2>
                <h2>{match.attributes.gameMode.toUpperCase()}</h2>
              </div>
              <br/>
              <div className="player-attributes">
                <h1>Win Place: {match.stats.winPlace + "/" + match.rosters.length}</h1>
                <h3>Time Survived: {survivalMinutes + ":"}{survivalSeconds < 10 ? ("0" + survivalSeconds) : survivalSeconds}</h3>
              </div>
              <div className="player-stats">
                <span>Kills: {match.stats.kills}</span>
                <span>Damage Dealt: {match.stats.damageDealt.toFixed(2)}</span>
              </div>
            </li>
          )
        });
      } else {
        matchHistory = <h1 className="match-history-loading">Loading...</h1>
      }

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
        <h1> </h1>
      )
    }
  }
}

export default connect(msp, mdp)(PlayerStats);