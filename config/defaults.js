/**
 * Function that returns default values for configuration.
 */
'use strict';

const path = require('path');
const srcPath = path.join(__dirname, '/../app/src');
const dfltPort = 4000;

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractStyles = new ExtractTextPlugin({ filename: 'app.css', allChunks: true });

const sassLoader = {
  loader: 'sass-loader',
  options: {
    sourceMap: false,
    data: '@import "./app/src/theme/variables.scss";', // Injects global sass variables into all sass modules
    includePaths: [path.join(__dirname, '/../node_modules')]
  }
};

const resolveUrlLoader = {
  loader: 'resolve-url-loader',
  options: {
    sourceMap: true,
    keepQuery: true
  }
};

const cssLoader = {
  loader: 'css-loader',
  options: {
    sourceMap: true
  }
};

/**
 * Get the default modules object for webpack
 * @return {Object}
 */
function getDefaultModules() {
  return {
    rules: [
        {
          enforce: 'pre',
          test: /\.(js|jsx)$/,
          include: srcPath,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        },
        {
          // Compile our own SASS and CSS
          test: /\.(s?css)$/,
          use: extractStyles.extract({
            fallback: 'style-loader',
            use: [ cssLoader, resolveUrlLoader, sassLoader ]
          })
        },
        {
          test: /\.(eot|svg|jpg|jpeg|ttf|woff|woff2)$/,
          loader: 'file-loader'
        }
    ]
  };
}

module.exports = {
  srcPath: srcPath,
  publicPath: '/',
  port: dfltPort,
  getDefaultModules: getDefaultModules,
  extractStyles: extractStyles
};
