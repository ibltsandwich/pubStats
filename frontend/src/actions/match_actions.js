import * as MatchApiUtil from '../util/match_api_util';

export const RECEIVE_MATCH = 'RECEIVE_MATCH';

export const receiveMatch = payload => {
  return {
    type: RECEIVE_MATCH,
    payload
  }
}

export const fetchMatch = matchId => dispatch => {
  return MatchApiUtil.fetchMatch(matchId)
    .then(response => dispatch(receiveMatch(response)));
}

export const createMatch = match => dispatch => {
  return MatchApiUtil.createMatch(match)
    .then(response => dispatch(receiveMatch(response)));
}