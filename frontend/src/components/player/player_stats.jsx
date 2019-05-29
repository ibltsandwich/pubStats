import React from 'react';
import { connect } from 'react-redux';

import { fetchPlayer } from '../../actions/player_actions';

const msp = state => {
  return {

  };
};

const mdp = dispatch => {
  return {
  };
}

class PlayerStats extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <h1>Player Page</h1>
    )
  }
}

export default connect(msp, mdp)(PlayerStats);