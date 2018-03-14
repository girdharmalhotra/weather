/*
** Component to handle the display of a locations current conditions.
*/

'use strict';

import React from 'react';
import classNames from 'classnames';
import { Conditions } from 'mockdata/Conditions';
import { windDirection } from 'utils/windDirection';

import './styles.scss';

const CurrentForcast = ({forecast}) => {
  if(!forecast) { // return empty if no forecast data
    return null;
  }

  // choose weather icon based on condition code map.
  let wxIcon = 'wi-' + Conditions[forecast.item.condition.code],
      wxIconClass = classNames('wxicon', 'wi', wxIcon);

  // derive the wind directions based on the degree.
  let windDir = windDirection(forecast.wind.direction),
      windDirIcon = windDir ? windDir.toLowerCase() : '',
      windIconClass = classNames('wxicon','wi wi-wind','wi-towards-'+windDirIcon);

  return (
    <div className="current-conditions">
      <div className="wx-details current-forecast">
        <h1 className="location">{forecast.location.city}, {forecast.location.region}</h1>
        <div className="curr-temp">
          <div className="wx-condition">
            <i className={wxIconClass}></i><span className="wx-text">{forecast.item.condition.text}</span>
          </div>
          <div className="wx-temp">
            <p className="high-low">
              <i className="fa fa-angle-double-up"></i><span className="high">{forecast.item.forecast[0].high}<sup>&deg;{forecast.units.temperature}</sup></span>
              <i className="fa fa-angle-double-down"></i><span className="low">{forecast.item.forecast[0].low}<sup>&deg;{forecast.units.temperature}</sup></span>
            </p>
            <p className="temp">{forecast.item.condition.temp} <sup>&deg;{forecast.units.temperature}</sup></p>
          </div>
        </div>
      </div>
      <div className="wx-details wind-details">
        <div className="detail">
          <h3 className="heading">Wind</h3>
          <i className={windIconClass}></i>
          <p className="text">{windDir} at {forecast.wind.speed} {forecast.units.speed}</p>
        </div>
      </div>
      <div className="wx-details atmosphere-details">
        <div className="detail">
          <h3 className="heading">Humidity</h3>
          <p className="text">{forecast.atmosphere.humidity} %</p>
        </div>
        <div className="detail">
          <h3 className="heading">Pressure</h3>
          <p className="text">{forecast.atmosphere.pressure} {forecast.units.pressure}</p>
        </div>
        <div className="detail">
          <h3 className="heading">Visibility</h3>
          <p className="text">{forecast.atmosphere.visibility} {forecast.units.distance}</p>
        </div>
      </div>
      <div className="wx-details astronomy-details">
        <div className="detail">
          <h3 className="heading">Sunrise</h3>
          <i className="wxicon wi wi-sunrise"></i>
          <p className="text">{forecast.astronomy.sunrise}</p>
        </div>
        <div className="detail">
          <h3 className="heading">Sunset</h3>
          <i className="wxicon wi wi-sunset"></i>
          <p className="text">{forecast.astronomy.sunset}</p>
        </div>
      </div>
    </div>
  )
}

export default CurrentForcast;
