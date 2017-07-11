'use strict';

//npm modules
const {Router} = require('express');
const jsonParser = require('body-parser').json();

//app modules
const User = require('../model/user.js');

//module logic
const authRouter = module.exports = new Router();
const basicAuth = require('../lib/basic-auth-middleware.js');

authRouter.post('/api/auth/register', jsonParser, (req, res, next) => {

  if(!req.body.password || !req.body.username) {
    return next(new Error('required arguments'));
  }
  User.create(req.body)
    .then(token => res.send(token))
    .catch(next);
});

authRouter.get('/api/auth/login', basicAuth, (req, res, next) => {
  console.log('/api/auth/login');
  req.user.tokenCreate()
    .then(token => res.send(token))
    .catch(next);
});
