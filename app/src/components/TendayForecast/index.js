/*
** Component to handle the display of a locations future forecast conditions.
*/

'use strict';

import React from 'react';
import classNames from 'classnames';
import { Conditions } from 'mockdata/Conditions';

import './styles.scss';

const TendayForecast = ({forecast}) => {
  if(!forecast) {
    return null;
  }

  const months = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  let forecastItems = forecast.item.forecast.map( (cast,idx) => {
    let wxIcon = 'wi-' + Conditions[cast.code],
        wxIconClass = classNames('wxicon', 'wi', wxIcon);

    let dateObj = new Date( Date.parse(cast.date) );

    return (
      <div key={idx} className="forecast-details">
        <h3 className="date">{months[dateObj.getMonth()]} {dateObj.getDate()}</h3>
        <h5 className="day">{cast.day}</h5>
        <i className={wxIconClass}></i>
        <p className="text">{cast.text}</p>
        <p className="high-low">
          <span className="high"><i className="fa fa-angle-double-up"></i>{cast.high}<sup>&deg;F</sup></span>
          <span className="low"><i className="fa fa-angle-double-down"></i>{cast.low}<sup>&deg;F</sup></span>
        </p>
      </div>
    )
  })

  return (
    <div className="tenday-forecast">
      {forecastItems}
    </div>
  )
}

export default TendayForecast;
