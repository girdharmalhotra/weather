/*
** Header Nav Component that shows recent locations searched by the user.
** the recently search locations are saved in the user's browser's local storage.
*/

'use strict';

import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router';

import './styles.scss';

class Header extends React.Component {
  constructor() {
    super();

    this.state = {
      responsive: false
    }

    this.toggleLocations = this.toggleLocations.bind(this);
  }

  // show the list of recent searches upto 3 items.
  populateRecentLocs() {
    let storedLocations = localStorage.getItem('locations'),
        viewMore = false, recentLocs;

    if(!storedLocations) {
      return null;
    }
    // fetch locations from localStorage
    let locsFromLS = JSON.parse(storedLocations);

    if(locsFromLS && locsFromLS.length > 3) {
      locsFromLS = locsFromLS.slice(0,3);
      viewMore = true;
    }
    // map the top 3 recent locations to show on the header.
    recentLocs = locsFromLS.map( (loc,idx) => {
      let location = isNaN(loc) ? loc.substring(0,loc.length-2) + ', ' + loc.substring(loc.length-2,loc.length) : loc;
      return (<Link key={idx} to={`/forecast/${location}`}>{location}</Link>);
    });
    // if more than 3 locations, show a view more option to go to the recent page.
    if(viewMore) {
      recentLocs.push(<Link key="recent" to='/recent'>View All Locations...</Link>)
    }

    return recentLocs;
  }

  toggleLocations = () => this.setState({ responsive: !this.state.responsive })

  render() {
    let navClass = classNames('topnav',{
     'responsive': this.state.responsive
    });

    return (
      <div className={navClass}>
        <Link className="active" to='/'>Search</Link>
        {this.populateRecentLocs()}
        <i className="icon fas fa-bars" onClick={ () => { return this.toggleLocations() } }></i>
      </div>
    );
  }
}

export default Header;
