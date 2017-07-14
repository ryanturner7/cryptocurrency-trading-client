'use strict';

const jwt = require('jsonwebtoken');
const User = require('../model/user');
const universalify = require('universalify');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  /* istanbul ignore next */
  if (!authorization) return next(new Error('unauthorized no auth header'));

  const token = authorization.split('Bearer ')[1];

  /* istanbul ignore next */
  if (!token) return next(new Error('unauthorized no token found'));

  universalify.fromCallback(jwt.verify)(token, process.env.APP_SECRET)
    .then(decoded => User.findOne({ tokenSeed: decoded.tokenSeed }))
    .then(user => {
      /* istanbul ignore next */
      if (!user) throw new Error('unauthorized no user found');
      req.user = user;
      next();
    })
    .catch(next);
};
