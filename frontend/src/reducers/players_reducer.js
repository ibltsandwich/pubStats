import { RECEIVE_PLAYER } from '../actions/player_actions';

import { merge } from 'lodash';

const playersReducer = (state = {}, action) => {
  Object.freeze(state);
  let newState = merge({}, state);

  switch (action.type) {
    case RECEIVE_PLAYER:
      return merge({}, newState, action.payload.data);
    default:
      return state;
  };
};

export default playersReducer;