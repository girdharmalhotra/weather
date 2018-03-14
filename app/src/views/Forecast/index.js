/*
** Forecast page view.
*/
'use strict'

import React from 'react';
import Header from 'components/Header';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getForecast,fetchForecast } from 'actions/Forecast';

import CurrentForecast from 'components/CurrentForecast';
import TendayForecast from 'components/TendayForecast';

import './styles.scss';

// map the redux state to the component props.
function mapStateToProps(state) {
  return {
    forecast: state.forecast
  }
}

// map the actions to the component props.
function mapDispatchToProps(dispatch) {
  return bindActionCreators({getForecast,fetchForecast}, dispatch);
}

class Forecast extends React.Component {
  constructor() {
    super();

    this.state = {
      loc : null
    }
  }

  // get the location whose data needs to be displayed on mount.
  componentDidMount() {
    this.props.getForecast(this.props.params.id).then( (locForecast) => {
      this.setState({ loc : locForecast });
    });
  }

  // get the location whose data needs to be displayed when switched.
  componentWillReceiveProps(nextProps) {
    let { params } = this.props;
    if(params.id !== nextProps.params.id) {
      this.props.getForecast(nextProps.params.id).then( (locForecast) => {
        this.setState({ loc : locForecast });
      });
    }
  }

  render() {
    return (
      <div>
        <Header />
        <CurrentForecast forecast={this.state.loc} />
        <TendayForecast forecast={this.state.loc} />
      </div>
    );
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Forecast);
