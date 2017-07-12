'use strict';

const cors = require('cors');
const morgan = require('morgan');
const express = require('express');
const mongoose = require('mongoose');

mongoose.Promise = Promise;
mongoose.connect(process.env.MONGODB_URI);

const app = express();

app.use(morgan('dev'));
app.use(cors());

//user route
app.use(require('../routes/auth-router.js'));

//profile route
app.use(require('../routes/profile-router.js'));

//trade routes
app.use(require('../routes/trade-router'));

//404 route for invalid path request
app.all('/api/*', (req, res, next) => res.sendStatus(404));

//error handler
app.use(require('./error-handler.js'));

//start and stop database
const server = module.exports = {};
server.isOn = false;
server.start = () => {
  return new Promise((resolve, reject) => {
    if(!server.isOn){
      server.http = app.listen(process.env.PORT, () => {
        server.isOn = true;
        console.log('server is running on PORT ', process.env.PORT);
        resolve();
      });
      return;
    }
    reject(new Error('server is already running'));
  });
};

server.stop = () => {
  return new Promise((resolve, reject) => {
    if(server.http && server.isOn){
      return server.http.close(() => {
        server.isOn = false;
        console.log('server just got killed');
        resolve();
      });
    }
    reject(new Error('server is not runnnig'));
  });
};
