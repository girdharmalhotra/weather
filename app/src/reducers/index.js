/**
 * Define all Redux Reducers.
 */

import { combineReducers } from 'redux';
import { ForecastReducer } from './ForecastReducer';

export default combineReducers({
  forecast: ForecastReducer
});
