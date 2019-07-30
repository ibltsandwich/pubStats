import React from 'react';

import TeamStats from './team_stats';
import PlayerStats from './player_stats';

class PlayerMatch extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.toggleMatch = this.toggleMatch.bind(this);
    this.showPlayerStats = this.showPlayerStats.bind(this);
    this.showTeamStats = this.showTeamStats.bind(this);
  }

  toggleMatch() {
    this.setState({show: !this.state.show, playerStats: true});
    this.showPlayerStats = this.showPlayerStats.bind(this);
    this.showTeamStats = this.showTeamStats.bind(this);
  }

  showPlayerStats(e) {
    e.stopPropagation();
    this.setState({playerStats: true});
    this.setState({teamStats: false});
    this.playerButton.className = 'stats-dropdown-player-button-clicked';
    this.teamButton.className = 'stats-dropdown-team-button';
  }

  showTeamStats(e) {
    e.stopPropagation();
    this.setState({playerStats: false});
    this.setState({teamStats: true});
    this.playerButton.className = 'stats-dropdown-player-button';
    this.teamButton.className = 'stats-dropdown-team-button-clicked';
  }

  render() {
    const { matchClass, idx, match, player } = this.props;
    const { survivalMinutes, survivalSeconds, gameDate, gameTime, mapName } = this.props.matchAttributes;

    return (
      <li className={matchClass} onClick={this.toggleMatch}>
        <div className="match-attributes">
          <div className="match-time">
            <h1>{gameDate}</h1>
            <h2>{gameTime}</h2>
          </div>
          <div className="match-finish-place">
            <h1>{match.stats.winPlace}</h1>
            <h2>/</h2>
            <h2>{Object.values(match.rosters).length}</h2>
          </div>
          <div className="match-details">
            <h4>{match.attributes.gameMode.toUpperCase()}</h4>
            <h5>{mapName}</h5>
          </div>
        </div>
        {this.state.show ? 
          <main className="stats-dropdown" onClick={e => e.stopPropagation()}>
            <header className="stats-dropdown-tabs">
              <div className="stats-dropdown-player-button-clicked" onClick={this.showPlayerStats} id={idx} ref={elem => this.playerButton = elem}>
                Your Stats
              </div>
              <div className="stats-dropdown-team-button" onClick={this.showTeamStats} id={idx} ref={elem => this.teamButton = elem}>
                Team Stats
              </div>
            </header>
            {this.state.playerStats ? 
              <section className="stats-dropdown-player">
                <PlayerStats survivalMinutes={survivalMinutes} survivalSeconds={survivalSeconds} match={match} />
              </section> 
              :
              <section className="stats-dropdown-team">
                <TeamStats matchId={match.id} team={match.team} player={player} />
              </section>
            }
          </main>
          :
          null}
      </li>
    )
  }

}

export default PlayerMatch;