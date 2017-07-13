'use strict';

const User = require('../../model/user.js');
const Profile = require('../../model/profile,js');

module.exports = () => {
  return Promise.all([
    User.remove({}),
    Profile.remove({}),
    
  ]);
};
