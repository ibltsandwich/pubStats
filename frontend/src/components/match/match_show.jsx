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

  }

  componentDidMount() {
    this.props.fetchMatch(this.props.matchId)
  }

  render() {
    if(this.props.matchErrors["Not Found"]) {
      return (
        <div className="match-error">
          <h1>Not Found</h1>
          <h2>{this.props.matchErrors["Not Found"]}</h2>
        </div>
      )
    } else if (this.props.match) {
      return (
        <h1>{this.props.match.attributes.createdAt}</h1>
      )
    } else {
      return (
        <h1>Loading...</h1>
      )
    }
  }
}

export default connect(msp, mdp)(MatchShow);