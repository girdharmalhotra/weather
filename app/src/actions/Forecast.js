/*
** Forecast Redux Actions.
*/

export const fetchForecast = (loc) => {
  return {
    types: ['FETCH_FORECAST','FETCH_FORECAST_SUCCESS','FETCH_FORECAST_FAILURE'],
    payload: {
      request: {
        url: '?q=select * from weather.forecast where woeid in (select woeid from geo.places(1) where text="'+ loc +'")&format=json'
      }
    },
    location: loc
  }
}

// Action to get the forecast of the requested location.
export const getForecast = (loc) => {
  return (dispatch,getState) => {
    let storedLocations = localStorage.getItem('locations');
    let location = loc.replace(/[\s,]/g,'');
    // if locations are not stored in Local Storage, create a locations storage for browser stickiness
    if(!storedLocations) {
      localStorage.setItem('locations',JSON.stringify([location]));
    } else {
      // retrive existing location from localStorage
      let locsFromLS = JSON.parse(storedLocations);

      // if location is already present in localStorage
      if(storedLocations.indexOf(location) >= 0) {
        let currentState = getState();
        // return location if already fetched before. don't make api call again.
        if(Object.keys(currentState.forecast.locations).indexOf(location) >= 0) {
          return Promise.resolve(currentState.forecast.locations[location]);
        }
      } else { // add the new location to localStorage
        locsFromLS.push(location);
        localStorage.setItem('locations',JSON.stringify(locsFromLS));
      }
    }

    // fetch request from api then return back the requested location's forecast.
    return dispatch(fetchForecast(loc)).then( () => {
      return getState().forecast.locations[location];
    });
  };
}
