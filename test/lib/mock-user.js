'use strict';

const faker = require('faker');
const User = require('../../model/user.js');

const mockUser = module.exports = {};


mockUser.createOne = () => {
  return new User({
    name: faker.name.findName(),

  })
    .save();
};


mockUser.createMany = (n) => {
  let mockUserArray = new Array(n)
    .fill(0).map(() => mockUser.createOne());
  return Promise.all(mockUserArray);
};
