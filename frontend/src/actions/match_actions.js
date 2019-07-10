import * as MatchApiUtil from '../util/match_api_util';

export const RECEIVE_MATCH = 'RECEIVE_MATCH';
export const GET_MATCH_ERRORS = 'RECEIVE_MATCH_ERRORS';

export const receiveMatch = payload => {
  return {
    type: RECEIVE_MATCH,
    payload
  }
}

export const receiveMatchErrors = payload => {
  return {
    type: GET_MATCH_ERRORS,
    payload
  }
}

export const fetchMatch = matchId => dispatch => {
  return MatchApiUtil.fetchMatch(matchId)
    .then(response => dispatch(receiveMatch(response)))
    .catch(err => dispatch(receiveMatchErrors(err.response.data)))
}

export const createMatch = match => dispatch => {
  return MatchApiUtil.createMatch(match)
    .then(response => dispatch(receiveMatch(response)));
}