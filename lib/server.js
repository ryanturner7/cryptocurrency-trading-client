'use strict';

const cors = require('cors');
const morgan = require('morgan');
const express = require('express');
const mongoose = require('mongoose');

mongoose.Promise = Promise;

if(process.env.node_env !== 'production') {
  require('dotenv').config();
}
// let MONGODB_URI = `mongodb://${process.env.MDB_USER}:${process.env.MDB_PASS}@ds1${process.env.MDB_PORT}.mlab.com:${process.env.MDB_PORT}/${process.env.APP_NAME}`;

mongoose.connect(process.env.MONGODB_URI);
const app = express();

app.use(morgan('dev'));
app.use(cors());

app.use(require('../routes/auth-register-router.js'));

app.all('/api/*', (req, res, next) => res.sendStatus(404));

// app.use(require('./error-middleware.js'));

const server = module.exports = {};
server.isOn = false;
server.start = () => {
  return new Promise((resolve, reject) => {
    if(!server.isOn){
      server.http = app.listen(process.env.PORT, () => {
        server.isOn = true;
        console.log('server up', process.env.PORT);
        resolve();
      });
      return;
    }
    reject(new Error('server already running'));
  });
};

server.stop = () => {
  return new Promise((resolve, reject) => {
    if(server.http && server.isOn){
      return server.http.close(() => {
        server.isOn = false;
        console.log('server down');
        resolve();
      });
    }
    reject(new Error('the server is not running'));
  });
};
