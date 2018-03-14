/**
  * Define all Routes of the Application.
  */

import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { ViewWrapper } from 'views/ViewWrapper';
import Forecast from 'views/Forecast';
import RecentLocations from 'views/RecentLocations';
import Home from 'views/Home';

export const Routes = (
  <Router history={browserHistory}>
    <Route path="/" component={ViewWrapper}>
      <IndexRoute component={Home} />
      <Route path="forecast/:id" component={Forecast}></Route>
      <Route path="recent" component={RecentLocations}></Route>
    </Route>
  </Router>
);
