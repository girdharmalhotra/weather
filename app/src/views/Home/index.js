/*
** Home page view.
*/
'use strict';

import React from 'react';
import Autocomplete from 'components/Autocomplete';

class Home extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="home-container">
        <Autocomplete />
      </div>
    );
  }
}

export default Home;
