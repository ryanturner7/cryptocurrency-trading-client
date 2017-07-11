'use strict';

const {Router} = require('express');
const jsonParser = require('body-parser');

const User = require('../model/user.js');
const Trade = require('../model/trade.js');

const profileRouter = module.exports = new Router();

profileRouter.get('/api/user', (req, res, next) => {
  User.find({})
    .then(users => res.json(users.map(user => user._id)))
    .catch(next);
});
