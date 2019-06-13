import axios from 'axios';
import { GET_ERRORS, receivePlayer } from '../actions/player_actions';

export const fetchPlayer = playerName => dispatch => {
  return axios
            .get(`api/players/${playerName}`, playerName)
            .then(response => dispatch(receivePlayer(response)))
            // .catch(err => {
            //   dispatch({
            //     type: GET_ERRORS,
            //     payload: err.response.data
            //   });
            // });
}