import axios from 'axios';

export const fetchMatch = matchId => {
  return axios.get(`api/matches/${matchId}`, matchId);
}

export const createMatch = match => {
  return axios.post(`api/matches`, match);
}