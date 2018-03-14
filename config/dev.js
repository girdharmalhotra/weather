'use strict';

let path = require('path');
let webpack = require('webpack');
let baseConfig = require('./base');
let defaultSettings = require('./defaults');

let config = Object.assign({}, baseConfig, {
  entry: './app/src/',
  cache: true,
  devtool: 'eval-source-map',
  plugins: [
    defaultSettings.extractStyles,
    new webpack.NoEmitOnErrorsPlugin()
  ],
  module: defaultSettings.getDefaultModules()
});

// Add needed rules to the defaults here
config.module.rules.push({
  test: /\.(js|jsx)$/,
  loader: 'babel-loader?presets[]=react,presets[]=es2015,presets[]=react,presets[]=stage-3&plugins[]=react-html-attrs,plugins[]=transform-class-properties,plugins[]=transform-decorators-legacy',
  include: [ path.join(__dirname, '/../app/src') ]
});

module.exports = config;
