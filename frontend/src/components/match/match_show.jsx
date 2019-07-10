import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchMatch } from '../../actions/match_actions';

const msp = (state, ownProps) => {
  const matchId = ownProps.match.params.matchId;
  let match;
  if (state.entities.matches[matchId]) {
    match = state.entities.matches[matchId];
  }
  const matchErrors = state.errors;
  return {
    matchId,
    match,
    matchErrors
  }
}

const mdp = dispatch => {
  return {
    fetchMatch: matchId => dispatch(fetchMatch(matchId)),
  }
}

class MatchShow extends React.Component {
  constructor(props) {
    super(props);

    this.state = { loading: true };
  };

  componentDidMount() {
    this.props.fetchMatch(this.props.matchId);
  };

  componentDidUpdate(oldProps) {
    if ((this.state.loading && this.props.match) ||
      (this.state.loading && this.props.matchErrors["Not Found"])) {
      this.setState({loading: false});
    };
  };

  parseTeams() {
    const {rosters, participants} = this.props.match;
    const matchTeams = {};

    Object.values(rosters).forEach(roster => {
      const rank = roster.attributes.stats.rank;
      matchTeams[roster.id]= [rank];
      
      roster.relationships.participants.data.forEach(participant => {
        matchTeams[roster.id].push(participants[participant.id]);
      });
    });

    const sortedTeams = Object.values(matchTeams).sort((a,b) => {
      return a[0] - b[0];
    });
    
    const teamsArray = sortedTeams.map((team,idx) => {
      const rank = team[0];

      const playersArray = team.map(player => {
        if (typeof(player) !== "number") {
          return <h2><Link to={`/players/${player.attributes.stats.name}`}>
            {player.attributes.stats.name}
          </Link></h2>;
        }
      });

      let className;
      if (rank == 1) {
        className = "winner";
      } else if (rank <= 10) {
        className = "top-10";
      } else {
        className = "dnp";
      };

      return (<li className="match-show-team" key={idx}>
        <h1 className={className}>#{rank}</h1>
        <div className="match-show-team-members">
          {playersArray}
        </div>
      </li>);
    });

    return teamsArray;
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
    if (!this.state.loading) {
      if(this.props.matchErrors["Not Found"]) {
        return (
          <div className="match-error">
            <h1>Not Found</h1>
            <h2>{this.props.matchErrors["Not Found"]}</h2>
          </div>
        )
      } else if (this.props.match) {

        const {attributes, rosters, participants} = this.props.match;
        const teamsArray = this.parseTeams()

        const gameDate = new Date(attributes.createdAt).toLocaleString();
        const mapName = this.setMapName(attributes.mapName).toUpperCase();

        return (
          <div className="match-show-container">
            <header className="match-show-header">
              <h1>{mapName}</h1>
              <h2>{attributes.gameMode.toUpperCase()}</h2>
              <h3 className="match-show-time">{gameDate}</h3>
            </header>
            <section>
              <ul>
                {teamsArray}
              </ul>
            </section>
          </div>
        )
      }
    } else {
      return (
        <div className="match-show-container">
          <h1>Loading...</h1>
        </div>
      )
    }
  }
}

export default connect(msp, mdp)(MatchShow);