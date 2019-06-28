import React from 'react';
import { connect } from 'react-redux';

import TeamStats from './team_stats';

import { fetchPlayer, updatePlayer } from '../../actions/player_actions';
import { removeErrors } from '../../util/session_api_util';

const API = 'https://api.pubg.com/shards/psn/matches/';

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
    updatePlayer: data => dispatch(updatePlayer(data)),
    removeErrors: () => dispatch(removeErrors()),
  };
}

class PlayerStats extends React.Component {
  constructor(props) {
    super(props);

    this.state = { loading: true, matches: {} };

    this.toggleMatch = this.toggleMatch.bind(this);
    this.showPlayerStats = this.showPlayerStats.bind(this);
    this.showTeamStats = this.showTeamStats.bind(this);
  }

  componentDidMount() {
    this.props.fetchPlayer(this.props.match.params.playerName);
  }

  componentDidUpdate(oldProps) {
    debugger
    if (Object.values(this.state.matches).length === 0 && this.props.player) {
      Object.values(this.props.player.matches).forEach(match => {
        if (!match.fetched) {
          fetch(API + match.id, {
                  method: 'GET',
                  headers: {
                    'Accept': 'application/vnd.api+json',
                    
                  },
            })
            .then(response => {
              return response.json();
            })
            .then(matchData => {
              const matchInfo = {};
              matchInfo.id = matchData.data.id;
              matchInfo.attributes = matchData.data.attributes;
              matchInfo.rosters = matchData.data.relationships.rosters.data;
              let participantId;
              let team;
              const teamInfo = {};
  
              for (let i = 0; i < matchData.included.length; i += 1) {
                const item = matchData.included[i];
                const playerId = this.props.player.playerId;
  
                if (item.type === "participant") {
                  if (item.attributes.stats.playerId === playerId) {
                    participantId = item.id
                    matchInfo.stats = item.attributes.stats;
                  };
                };
              };
  
              for (let i = 0; i < matchData.included.length; i += 1) {
                const item = matchData.included[i];
  
                if (item.type === "roster") {
                  item.relationships.participants.data.forEach(member => {
                    if (member.id === participantId) {
                      team = item.relationships.participants.data;
                    };
                  });
                };
              };
  
              team.forEach(member => {
                for (let i = 0; i < matchData.included.length; i += 1) {
                  const item = matchData.included[i];
  
                  if (item.type === "participant") {
                    if (item.id === member.id) {
                      teamInfo[item.attributes.stats.playerId] = item.attributes.stats;
                    };
                  };
                };
              });
  
              matchInfo.team = teamInfo;
              matchInfo.fetched = true;
  
              this.setState(state => {
                return { matches: Object.assign(state.matches, {[match.id]: matchInfo})};
              });
            });
        } else {
          this.setState(state => { 
            return { matches: Object.assign(state.matches, {[match.id]: this.props.player.matches[match.id]}) }
          })
        }
      });
    };
    
    if (this.state.loading && this.props.player) {
      if (Object.values(this.props.player.matches).length === Object.values(this.state.matches).length) {
        this.setState({ loading: false });
        this.props.updatePlayer({
          playerName: this.props.player.name,
          matches: this.state.matches
        });
      }
    };

    if (oldProps.location.pathname !== this.props.location.pathname) {
      const newState = { loading: true, matches: {} };
      Object.keys(this.state).forEach(key => {
        if (key === 'loading' || key === 'matches'){
          null;
        } else {
          newState[key] = false;
        }
      });
      this.setState(newState, () => this.props.fetchPlayer(this.props.match.params.playerName));
    };
  }

  componentWillUnmount() {
    this.props.removeErrors();
  }

  toggleMatch(e) {
    this.setState({[e.currentTarget.id]: !this.state[e.currentTarget.id]});
    this.setState({[`playerStats${e.currentTarget.id}`]: true});
  }

  showPlayerStats(e) {
    e.stopPropagation();
    this.setState({[`playerStats${e.currentTarget.id}`]: true});
    this.setState({[`teamStats${e.currentTarget.id}`]: false});
    this[`playerButton${e.currentTarget.id}`].style.background = 'lightgray';
    this[`teamButton${e.currentTarget.id}`].style.background = '#e1e4e3';
  }

  showTeamStats(e) {
    e.stopPropagation();
    this.setState({[`playerStats${e.currentTarget.id}`]: false});
    this.setState({[`teamStats${e.currentTarget.id}`]: true});
    this[`playerButton${e.currentTarget.id}`].style.background = '#e1e4e3';
    this[`teamButton${e.currentTarget.id}`].style.background = 'lightgray';
  }

  render() {
    if (this.props.errors.length > 0) {
      return(
        <div className="player-errors">
          <h1 className="player-error-title">{this.props.errors[0].title}</h1>
          <h1 className="player-error-detail">{this.props.errors[0].detail}</h1>
        </div>
      )
    } else if(this.props.player) {
      const { player } = this.props;
      const updated = new Date(Date.parse(player.updatedAt));
      const sortedHistory = Object.values(this.state.matches).sort((a, b) => 
        new Date(b.attributes.createdAt) - new Date(a.attributes.createdAt)
      ).slice(0, 29);
      let matchHistory;

      if (!this.state.loading) {
        matchHistory = sortedHistory.map((match,idx) => {
          const date = new Date(match.attributes.createdAt).toLocaleString();
          const survivalMinutes = Math.floor(match.stats.timeSurvived / 60);
          const survivalSeconds = Math.round(((match.stats.timeSurvived / 60) % 1) * 60);
          const gameDate = date.split(",")[0];
          const gameTime = date.split(",")[1];
          let style;
          if (match.stats.winPlace === 1) {
            style = {borderImage: 'linear-gradient(to bottom, #7ab4698a, #3d9938a8) 1 stretch'};
          } else if (match.stats.winPlace <= 10) {
            style = {borderImage: 'linear-gradient(to bottom, #42c7f491, #5497c2de) 1 stretch'};
          } else {
            style = {borderImage: 'linear-gradient(to bottom, #f87f7f8f, #f62e3394) 1 stretch'};
          };

          return (
            <li className="player-match" id={idx} key={idx} onClick={this.toggleMatch} style={style}>
              <div className="match-attributes">
                <h1>{gameDate}</h1>
                <h2>{gameTime}</h2>
                <h1>{match.stats.winPlace + "/" + match.rosters.length}</h1>
                <h3>{match.attributes.gameMode.toUpperCase()}</h3>
              </div>
              {this.state[idx] ? 
                <main className="stats-dropdown" onClick={e => e.stopPropagation()}>
                  <header className="stats-dropdown-tabs">
                    <div className="stats-dropdown-player-button" onClick={this.showPlayerStats} id={idx} ref={elem => this[`playerButton${idx}`] = elem}>
                      Your Stats
                    </div>
                    <div className="stats-dropdown-team-button" onClick={this.showTeamStats} id={idx} ref={elem => this[`teamButton${idx}`] = elem}>
                      Team Stats
                    </div>
                  </header>
                  {this.state[`playerStats${idx}`] ? 
                    <section className="stats-dropdown-player">
                      <div className="player-attributes">
                        <h3>Time Survived: {survivalMinutes + ":"}{survivalSeconds < 10 ? ("0" + survivalSeconds) : survivalSeconds}</h3>
                        <h1>Distance Traveled: {(match.stats.walkDistance + match.stats.swimDistance + match.stats.rideDistance).toFixed(2)}m</h1>
                      </div>
                      <div className="player-stats">
                        <span>Kills: {match.stats.kills}</span>
                        <span>Damage Dealt: {match.stats.damageDealt.toFixed(2)}</span>
                      </div>
                    </section> 
                    :
                    <section className="stats-dropdown-team">
                      <TeamStats team={match.team} player={player} />
                    </section>
                  }
                </main>
                :
                null}
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
              {matchHistory.length > 0 ? 
                matchHistory
                :
                this.state.loading ? 
                  <h1 className="player-loading">Loading...</h1> 
                  : 
                  <h1 className="match-history-loading">No matches found</h1>
              }
            </ul>
          </main>
        </div>

      )
    } else {
      return(
        <h1 className="player-loading">Loading...</h1>
      )
    }
  }
}

export default connect(msp, mdp)(PlayerStats);