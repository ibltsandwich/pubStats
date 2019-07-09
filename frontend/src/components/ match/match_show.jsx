import React from 'react';
import { connect } from 'react-redux';

import { fetchMatch } from '../../actions/match_actions';

const msp = state => {
  return {}
}

const mdp = dispatch => {
  return {
    fetchMatch: matchId => dispatch(fetchMatch(matchId));
  }
}
