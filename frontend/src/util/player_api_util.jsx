import axios from 'axios';
import { receivePlayer, receivePlayerErrors } from '../actions/player_actions';

export const fetchPlayer = playerName => dispatch => {
  return axios
            .get(`api/players/${playerName}`, playerName)
            .then(response => {
              dispatch(receivePlayer(response));
            })
            .catch(err => {
              dispatch(receivePlayerErrors(err.response.data));
            })
};