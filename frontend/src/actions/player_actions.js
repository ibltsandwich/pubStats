import * as PlayerApiUtil from '../util/player_api_util';

export const RECEIVE_PLAYER = 'RECEIVE_PLAYER';
export const GET_ERRORS = 'GET_ERRORS';
 
export const receivePlayer = payload => {
  return {
    type: RECEIVE_PLAYER,
    payload
  };
};

export const fetchPlayer = playerName => {
  return PlayerApiUtil.fetchPlayer(playerName)
};