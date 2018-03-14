/**
 * Run a local express node server for localhost.
 */

'use strict';

const express = require('express');
const app = express();
const path = require('path');

// MIDDLEWARE TO DEFINE FOLDER FOR STATIC FILES
app.use(express.static('app/dist'));

app.get('*', function(req,res) {
  res.sendFile(path.resolve(__dirname, 'app/src', 'index.html'));
});

app.listen(4000, function() {
  console.log('App Local Server is running on port 4000');
});
