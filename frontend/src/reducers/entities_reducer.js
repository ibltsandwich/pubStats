import { combineReducers } from 'redux';
import players from './players_reducer';
import matches from './matches_reducer';

const entitiesReducer = combineReducers({
  players,
  matches
});

export default entitiesReducer;