/*
** Recent Locations page view.
*/

'use strict'

import React from 'react';
import Header from 'components/Header';
import { Link } from 'react-router';

import './styles.scss';

class RecentLocations extends React.Component {
  constructor() {
    super();
  }
  // load all the recent locations from the user's browser's localStorage
  LoadLocations() {
    let storedLocations = localStorage.getItem('locations');

    if(!storedLocations) {
      return (<li> No Locations to Display. </li>);
    }

    let locsFromLS = JSON.parse(storedLocations);

    return locsFromLS.map( (loc,idx) => {
      let location = isNaN(loc) ? loc.substring(0,loc.length-2) + ', ' + loc.substring(loc.length-2,loc.length) : loc;
      return (<li key={idx} className="list-item"><Link key={idx} to={`/forecast/${location}`}>{location}</Link></li>);
    });
  }

  render() {
    return (
      <div className="recent-locations">
        <Header />
        <ul className="loc-list">
          {this.LoadLocations()}
        </ul>
      </div>
    );
  }
}

export default RecentLocations;
