import axios from 'axios';

export const fetchPlayer = playerName => {
  return axios.get(`api/players/${playerName}`, playerName);
}