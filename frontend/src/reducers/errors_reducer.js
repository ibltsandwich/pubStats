import { GET_SESSION_ERRORS, CLEAR_ERRORS, RECEIVE_CURRENT_USER } from '../util/session_api_util';
import { GET_PLAYER_ERRORS } from '../actions/player_actions';
import { GET_MATCH_ERRORS } from '../actions/match_actions';

export default (state = [], action) => {
  Object.freeze(state);
  switch (action.type) {
    case GET_SESSION_ERRORS:
      return action.payload;
    case GET_PLAYER_ERRORS:
      return action.payload;
    case GET_MATCH_ERRORS:
      return action.payload;
    case CLEAR_ERRORS:
    case RECEIVE_CURRENT_USER:
      return [];
    default:
      return state;
  }
};