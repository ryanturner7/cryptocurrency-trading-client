'use strict';

const cors = require('cors');
const morgan = require('morgan');
const express = require('express');
const mongoose = require('mongoose');

mongoose.Promise = Promise;
mongoose.connect(process.env.MONGODB_URI);

const app = express();
const server = module.exports = {};

app.use(morgan('dev'));
app.use(cors());

app.use(require('../routes/profile-router'));
app.use(require('../routes/trade-router'));
app.use(require('../routes/auth-router'));
app.use(require('./error-handler.js'));

//eslint-disable-next-line
app.all('/api/*', (req, res, next) => res.sendStatus(404));

server.isOn = false;
server.start = () => {
  return new Promise((resolve, reject) => {
    /* istanbul ignore next */
    if (!server.isOn) {
      server.http = app.listen(process.env.PORT, () => {
        server.isOn = true;
        console.log('server is running on PORT ', process.env.PORT);
        resolve();
      });
      return;
    }
    /* istanbul ignore next */
    reject(new Error('server is already running'));
  });
};

server.stop = () => {
  return new Promise((resolve, reject) => {
    /* istanbul ignore next */
    if (server.http && server.isOn) {
      return server.http.close(() => {
        server.isOn = false;
        console.log('server just got killed');
        resolve();
      });
    }
    /* istanbul ignore next */
    reject(new Error('server is not runnnig'));
  });
};
