import * as PlayerApiUtil from '../util/player_api_util';

export const RECEIVE_PLAYER = 'RECEIVE_PLAYER';
export const GET_PLAYER_ERRORS = 'GET_PLAYER_ERRORS';
 
export const receivePlayer = payload => {
  return {
    type: RECEIVE_PLAYER,
    payload
  };
};

export const receivePlayerErrors = payload => {
  return {
    type: GET_PLAYER_ERRORS,
    payload
  }
}

export const fetchPlayer = playerName => {
  return PlayerApiUtil.fetchPlayer(playerName)
};