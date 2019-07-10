import React from 'react';
import { connect } from 'react-redux';

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
        

        return (
          <div className="match-show-container">
            <header className="match-show-header">
              <h1 className="match-show-time">{attributes.createdAt}</h1>
            </header>
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