/**
 * Build the Redux Store.
 * The Store is connected with the Axios Middleware.
 * Axios handles all API HTTP Requests.
 */

'use strict';
import { createStore, applyMiddleware } from 'redux';
import axiosMiddleware from 'redux-axios-middleware';
import logger from 'redux-logger';
import reducers from 'reducers';
import axios from 'axios';
import thunk from 'redux-thunk';

// Axios HTTP client
const axiosClient = axios.create({
  baseURL:'https://query.yahooapis.com/v1/public/yql',
  responseType: 'json'
});

// Define Axios Redux Middleware
const apiMiddleware = axiosMiddleware( axiosClient );

// APPLY MIDDLEWARES
const middleware = applyMiddleware(logger, thunk, apiMiddleware);

// CREATE THE STORE
export const store = createStore(reducers, middleware);
