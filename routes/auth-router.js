'use strict';

const { Router } = require('express');
const jsonParser = require('body-parser').json();

const User = require('../model/user');
const bearerAuth = require('../lib/bearer-auth');
const basicAuth = require('../lib/basic-auth-middleware');

const authRouter = module.exports = new Router();

authRouter.post('/api/auth/register', jsonParser, (req, res, next) => {

  // console.log('body', req.body);

  if (!req.body.password || !req.body.username) return next(new Error('required arguments'));
  User.create(req.body)
    .then(token => res.send(token))
    .catch(next);
});

authRouter.get('/api/auth/login', basicAuth, (req, res, next) => {

  // console.log('/api/auth/login');

  req.user.tokenCreate()
    .then(token => res.send(token))
    .catch(next);
});

authRouter.delete('/api/auth/delete', bearerAuth, (req, res, next) => {

  // console.log('hit DELETE', req.user);

  User.findOneAndRemove({ _id: req.user._id })
    .then(user => res.send(user._id))
    .catch(next);
});
