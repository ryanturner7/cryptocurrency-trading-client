'use strict';

const expect = require('expect');
const superagent = require('superagent');
const server = require('../lib/server.js');
const cleanDB = require('./lib/clean-db.js');
const mockUser = require('./lib/mock-user.js');

const API_URL = process.env.API_URL;

describe('testing profile router', () => {
  before(server.start);
  after(server.stop && cleanDB);

  
});
