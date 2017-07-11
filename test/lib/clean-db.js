'use strict';

const User = require('../../model/user.js');

module.exports = () => {
  return Promise.all([
    User.remove({}),
  ]);
};
