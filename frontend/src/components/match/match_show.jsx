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
  }

  componentDidMount() {
    this.props.fetchMatch(this.props.matchId);
  }

  componentDidUpdate(oldProps) {
    if ((this.state.loading && this.props.match) ||
      (this.state.loading && this.props.matchErrors["Not Found"])) {
      this.setState({loading: false});
    };
  }

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
        const matchTeams = {};

        Object.values(rosters).forEach(roster => {
          roster.relationships.participants.data.forEach(participant => {
            const rank = roster.attributes.stats.rank;

            if (matchTeams[rank]) {
              matchTeams[rank].push(participants[participant.id]);
            } else{
              matchTeams[rank] = [participants[participant.id]];
            };
          });
        });

        let teamsArray = [];
        for (let key in matchTeams) {
          const playersArray = matchTeams[key].map(player => {
            return <h2><Link to={`/players/${player.attributes.stats.name}`}>
              {player.attributes.stats.name}
            </Link></h2>;
          });

          let className;
          if (key == 1) {
            className = "winner"
          } else if (key <= 10) {
            className = "top-10"
          } else {
            className = "dnp"
          }

          teamsArray.push(<li className="match-show-team" key={key}>
            <h1 className={className}>#{key}</h1>
            <div className="match-show-team-members">
              {playersArray}
            </div>
          </li>);
        }

        const gameDate = new Date(attributes.createdAt).toLocaleString();

        return (
          <div className="match-show-container">
            <header className="match-show-header">
              <h1 className="match-show-time">{gameDate}</h1>
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