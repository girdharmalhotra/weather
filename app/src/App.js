/*
** App Component that loads the SPA.
*/
'use strict';

import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import { Routes } from './routes';

import 'theme';

const app = (
  <Provider store={ store }>
    {Routes}
  </Provider>
);

class App extends React.Component{
  constructor() {
    super();
  }

  render() {
    return ( app );
  }
}

export default App;
