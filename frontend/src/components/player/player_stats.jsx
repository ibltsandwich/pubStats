import React from 'react';
import { connect } from 'react-redux';

import { fetchPlayer } from '../../actions/player_actions';

const msp = state => {
  const player = state.entities.players.player;
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
  }

  componentDidMount() {
    this.props.fetchPlayer(this.props.match.params.playerName);
  }

  render() {
    if(this.props.player) {
      const { player } = this.props;
      const updated = new Date(Date.parse(player.time));
      const matchHistory = player.matches.data.map((match,idx) => {
        return <li id="player-match" key={idx}>Match: {match.id}</li>
      });

      return(
        <div className="player-stats-container">
          <header className="player-header">
            <h1>{player.name}</h1>
            <h3>Last Updated: {updated.toLocaleString()}</h3>


          </header>
          <main className="player-match-history">
            <ul className="match-history-list">
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