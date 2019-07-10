import React from 'react';
import { connect } from 'react-redux';

import PlayerMatch from './player_match';

import { fetchPlayer, updatePlayer } from '../../actions/player_actions';
import { createMatch } from '../../actions/match_actions';
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
    createMatch: data => dispatch(createMatch(data)),
    removeErrors: () => dispatch(removeErrors()),
  };
}

class PlayerMatchHistory extends React.Component {
  constructor(props) {
    super(props);

    this.state = { loading: true, matches: {}, updated: false };

    this.updatePlayerButton = this.updatePlayerButton.bind(this);
  }

  componentDidMount() {
    this.props.fetchPlayer(this.props.match.params.playerName);
  }

  componentDidUpdate(oldProps) {
    if (this.props.player && oldProps.player) {
      if (oldProps.player.updatedAt !== this.props.player.updatedAt) {
        this.setState({ matches: {}, loading: true });
      }
    }

    if (Object.values(this.state.matches).length === 0 && this.props.player) {
      if (this.props.player.matches) {
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
                matchInfo.participants = {};

                const createMatchData = {};
                createMatchData.matchId = matchData.data.id;
                createMatchData.attributes = matchData.data.attributes;
                createMatchData.rosters = {};
                createMatchData.participants = {};
                
                let participantId;
                let team;
                const teamInfo = {};
    
                for (let i = 0; i < matchData.included.length; i += 1) {
                  const item = matchData.included[i];
                  const playerId = this.props.player.playerId;
    
                  if (item.type === "participant") {
                    createMatchData.participants[item.id] = item;
                    matchInfo.participants[item.id] = item;

                    if (item.attributes.stats.playerId === playerId) {
                      participantId = item.id
                      matchInfo.stats = item.attributes.stats;
                    };
                  };
                };
    
                for (let i = 0; i < matchData.included.length; i += 1) {
                  const item = matchData.included[i];
    
                  if (item.type === "roster") {
                    createMatchData.rosters[item.id] = item;

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
                }, () => this.props.createMatch(createMatchData));
              });
          } else {
            this.setState(state => { 
              return { matches: Object.assign(state.matches, {[match.id]: this.props.player.matches[match.id]}) }
            })
          }
        });
      }
    };
    
    if (this.state.loading && this.props.player) {
      if (Object.values(this.props.player.matches).length === 0 ||
          Object.values(this.props.player.matches).length === Object.values(this.state.matches).length) {
        this.setState({ loading: false });
      };
    };

    if (oldProps.location.pathname !== this.props.location.pathname) {
      window.scrollTo(0, 0);
      const newState = { loading: true, matches: {} };
      this.setState(newState, () => this.props.fetchPlayer(this.props.match.params.playerName));
    };
  }

  componentWillUnmount() {
    this.props.removeErrors();
  }

  updatePlayerButton(e) {
    e.preventDefault();

    this.props.updatePlayer({
      playerName: this.props.player.name,
      matches: this.state.matches
    });
      
    e.target.innerHTML = "Updated";
    e.target.disabled = true;
    e.target.classList.add("disabled");
  }

  setMapName(map) {
    switch(map) {
      case "Erangel_Main":
        return "Erangel";
      case "Savage_Main":
        return "Sanhok";
      case "DihorOtok_Main":
        return "Vikendi";
      case "Desert_Main":
        return "Miramar";
    };
  };

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
      let matchHistory;

      if (!this.state.loading) {
        const sortedHistory = Object.values(this.state.matches).sort((a, b) => 
          new Date(b.attributes.createdAt) - new Date(a.attributes.createdAt)
        ).slice(0, 29);

        matchHistory = sortedHistory.map((match,idx) => {
          const date = new Date(match.attributes.createdAt).toLocaleString();

          const matchAttributes = {
            survivalMinutes: Math.floor(match.stats.timeSurvived / 60),
            survivalSeconds: Math.round(((match.stats.timeSurvived / 60) % 1) * 60),
            gameDate: date.split(",")[0],
            gameTime: date.split(",")[1],
            mapName: this.setMapName(match.attributes.mapName),
          }

          let matchClass;
          if (match.stats.winPlace === 1) {
            matchClass = "player-match win";
          } else if (match.stats.winPlace <= 10) {
            matchClass = "player-match top-10";
          } else {
            matchClass = "player-match lose";
          };

          return (
            <PlayerMatch 
              player={player}
              match={match} 
              date={date} 
              matchAttributes={matchAttributes} 
              matchClass={matchClass} 
              key={idx} 
            />
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
            <button className="player-update-button" onClick={this.updatePlayerButton}>Update Stats</button>

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

export default connect(msp, mdp)(PlayerMatchHistory);