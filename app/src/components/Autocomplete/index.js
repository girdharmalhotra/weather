/*
** Autocomplete Component that handles location searches.
*/

'use strict';

import React from 'react';
import classNames from 'classnames';
import {locations} from 'mockdata/Locations';
import { browserHistory } from 'react-router';

import './styles.scss';

class Autocomplete extends React.Component {
  constructor() {
    super();

    this.state = {
      locations: locations, // locations to load by default.
      searchText: '',
      listVisibility: false
    }

    this.performSearch = this.performSearch.bind(this);
    this.goto = this.goto.bind(this);
  }

  // toggle dropdown list visibility
  showList = () => this.setState({ listVisibility: true });
  hideList = () => this.setState({ listVisibility: false });

  // update the components state when user is typing..
  performSearch(event) {
    this.setState({ searchText: event.target.value });
  }

  // go to the locations forecast page on click.
  goto(loc) {
    browserHistory.push('/forecast/'+loc);
  }

  // load the list of filtered/unfiltered locations based on components state of search text.
  locationsList() {
    let {locations,searchText} = this.state;

    if(!searchText) {
      return locations.map( (loc,idx) => <li key={idx} onMouseDown={ () => { this.goto(loc); } }>{loc}</li> );
    }

    return locations.reduce( (filteredList,loc,idx) => {
      if( loc.toLowerCase().indexOf(searchText.toLowerCase()) >= 0) {
        filteredList.push( <li key={idx}>{loc}</li> );
      }

      return filteredList;
    }, []);
  }

  render() {
    let listClass = classNames('autocomplete-results',{
     'visible': this.state.listVisibility
    });

    return (
      <div className="autocomplete-container">
        <i className="fa fa-search"></i>
        <input type="text"
               name="autocomplete"
               placeholder="Enter City or Zip. Ex: Boston,MA or 02210"
               className="autocomplete-input"
               onKeyUp={this.performSearch}
               onFocus={this.showList}
               onBlur={this.hideList}>
             </input>
        <ul className={listClass}>
          {this.locationsList()}
        </ul>
      </div>
    );
  }
}

export default Autocomplete;
