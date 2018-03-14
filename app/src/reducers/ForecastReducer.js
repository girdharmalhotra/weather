/*
** Reducer to handle the state of the loaded locations across the app
*/

import {mockForecast} from 'mockdata/mockForecast';

const initialState = {
  locations: {},
  currentLoc: '',
  error: false,
  errorMessage: ''
};

// Forecast Reducer
export const ForecastReducer = (state = initialState, action) => {
  const currentState = state; // current app state.
  let location = {};
  switch (action.type) {
    case 'FETCH_FORECAST_SUCCESS': // fetch the location forecast data and store it in app state.
      if(!action.payload.data.query.results) {
        action.payload.data = mockForecast; // use mockForecast if no data from API
      }

      let locData = action.payload.data.query.results.channel;
      let loc = locData.location.city.trim() + locData.location.region.trim();
      location[loc] = locData;

      let locationSet = Object.assign({}, currentState.locations, location)
      return { ...currentState, locations: locationSet, currentLoc: loc };
    case 'FETCH_FORECAST_FAILURE':
      return {...currentState, error: true, errorMessage: 'API call failed!'};
    default:
      return state;
  }
}
