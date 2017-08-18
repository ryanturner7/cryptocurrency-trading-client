'use strict';

const User = require('../model/user');

module.exports = (req, res, next) => {
  /* istanbul ignore next */
  const { authorization } = req.headers;

  // console.log('header', authorization);
/* istanbul ignore next */
  if (!authorization) return next(new Error('unauthorized no authorization provided'));
/* istanbul ignore next */
  const encoded = authorization.split('Basic')[1];

  /* istanbul ignore next */
  if (!encoded) return next(new Error('unauthorized no basic auth provided'));
/* istanbul ignore next */
  const decoded = new Buffer(encoded, 'base64').toString();
  /* istanbul ignore next */
  const [username, password] = decoded.split(':');
/* istanbul ignore next */
  if (!username || !password) return next(new Error('unauthorized username or password was missing'));
/* istanbul ignore next */
  User.findOne({username})
  /* istanbul ignore next */
    .then(user => user ? user.passwordHashCompare(password) : next(new Error('unauthorized user does not exist')))
    .then(user => {
      /* istanbul ignore next */
      req.user = user;
      /* istanbul ignore next */
      next();
    })
    /* istanbul ignore next */
    .catch(() => next(new Error('unauthorized find one failed in basic auth middleware')));
};
