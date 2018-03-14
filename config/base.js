/**
 * Build the base object to use either in dev or production env.
 * Use defualtSettings.
 */
'use strict';
let path = require('path');
let defaultSettings = require('./defaults');

/**
 * Return the base object for webpack
 * @return {Object}
 */
module.exports = {
  devtool: 'source-map',
  output: {
    path: path.join(__dirname, '/../app/dist'),
    filename: 'app.js',
    publicPath: defaultSettings.publicPath
  },
  watch: true,
  devServer: {
    contentBase: './app/src/',
    historyApiFallback: true,
    hot: true,
    port: defaultSettings.port,
    publicPath: defaultSettings.publicPath,
    noInfo: false,
    inline: true
  },
  resolve: {
    extensions: ['.js', '.jsx', '.css'],
    alias: {
      actions: `${defaultSettings.srcPath}/actions/`,
      components: `${defaultSettings.srcPath}/components/`,
      views: `${defaultSettings.srcPath}/views/`,
      reducers: `${defaultSettings.srcPath}/reducers/`,
      theme: `${defaultSettings.srcPath}/theme/`,
      utils: `${defaultSettings.srcPath}/utils/`,
      mockdata: path.join(__dirname, '/../mocks')
    }
  },
  // customize the webpack "build" cli output...
  stats: {
    assets: true,
    children: false,
    chunks: false,
    colors: false,
    errors: true,
    errorDetails: true,
    hash: true,
    modules: false,
    performance: false,
    version: false
  },
  module: {}
};
