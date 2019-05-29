import * as PlayerApiUtil from '../util/player_api_util';

export const RECEIVE_PLAYER = 'RECEIVE_PLAYER';

export const receivePlayer = payload => {
  return {
    type: RECEIVE_PLAYER,
    payload
  };
};

export const fetchPlayer = playerName => dispatch => {
  return PlayerApiUtil.fetchPlayer(playerName)
    .then(response => dispatch(receivePlayer(response)));
};