'use strict';

const User = require('../../model/user');
const Coin = require('../../model/trade');
const Profile = require('../../model/profile');

module.exports = () => {
  return Promise.all([
    User.remove({}),
    Profile.remove({}),
    Coin.remove({}),
  ]);
};
