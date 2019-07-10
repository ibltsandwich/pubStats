import { RECEIVE_MATCH } from '../actions/match_actions';

import { merge } from 'lodash';

const matchesReducer = ( state = {}, action ) => {
  Object.freeze(state);
  let newState = merge({}, state);

  switch (action.type) {
    case RECEIVE_MATCH:
      return merge(newState, action.payload.data);
    default:
      return state;
  }
}

export default matchesReducer;