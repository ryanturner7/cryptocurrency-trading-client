'use strict';

//npm modules
const {Router} = require('express');
const jsonParser = require('body-parser').json();

//app modules
const User = require('../model/user.js');

//module logic
const authRouter = module.exports = new Router();

authRouter.post('/api/auth/register', jsonParser, (req, res, next) => {

  if(!req.body.password || !req.body.username) {
    return next(new Error('required arguments'));
  }
  User.create(req.body)
    .then(token => res.send(token))
    .catch(next);
});
