'use strict';

const User = require('../model/user');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  // console.log('header', authorization);
  if (!authorization) return next(new Error('unauthorized no authorization provided'));

  const encoded = authorization.split('Basic')[1];

  /* istanbul ignore next */
  if (!encoded) return next(new Error('unauthorized no basic auth provided'));

  const decoded = new Buffer(encoded, 'base64').toString();
  const [username, password] = decoded.split(':');

  if (!username || !password) return next(new Error('unauthorized username or password was missing'));

  User.findOne({username})
    .then(user => user ? user.passwordHashCompare(password) : next(new Error('unauthorized user does not exist')))
    .then(user => {
      req.user = user;
      next();
    })
    /* istanbul ignore next */
    .catch(() => next(new Error('unauthorized find one failed in basic auth middleware')));
};
