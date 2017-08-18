'use strict';

const { Router } = require('express');
const jsonParser = require('body-parser').json();

const User = require('../model/user');
const bearerAuth = require('../lib/bearer-auth');
const basicAuth = require('../lib/basic-auth-middleware');

const authRouter = module.exports = new Router();

authRouter.post('/api/auth/register', jsonParser, (req, res, next) => {

  // console.log('body', req.body);
  /* istanbul ignore next */
  if (!req.body.password || !req.body.username) return next(new Error('required arguments'));
  /* istanbul ignore next */
  User.create(req.body)
  /* istanbul ignore next */
    .then(token => res.send(token))
    .catch(next);
});

authRouter.get('/api/auth/login', basicAuth, (req, res, next) => {

  // console.log('/api/auth/login');
/* istanbul ignore next */
  req.user.tokenCreate()
  /* istanbul ignore next */
    .then(token => res.send(token))
    .catch(next);
});

authRouter.delete('/api/auth/delete', bearerAuth, (req, res, next) => {

  // console.log('hit DELETE', req.user);
/* istanbul ignore next */
  User.findOneAndRemove({ _id: req.user._id })
  /* istanbul ignore next */
    .then(user => res.send(user._id))
    .catch(next);
});
