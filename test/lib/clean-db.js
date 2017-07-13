'use strict';

const User = require('../../model/user');
const Profile = require('../../model/profile');
const Coin = require('../../model/trade');

module.exports = () => {
  return Promise.all([
    User.remove({}),
    Profile.remove({}),
    Coin.remove({}),
  ]);
};
