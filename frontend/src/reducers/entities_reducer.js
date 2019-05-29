import { combineReducers } from 'redux';
import players from './players_reducer';

const entitiesReducer = combineReducers({
  players,
});

export default entitiesReducer;