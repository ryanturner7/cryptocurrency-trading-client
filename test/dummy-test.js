'use strict';

require('dotenv').config({path: `${__dirname}/../.env`});
require('./lib/mock-aws.js');


const mocha = require('mocha');
const expect = require('expect');
const server = require('../lib/server');

describe('Testing dummy', () => {
  before(server.start);
  after(server.stop);
  describe('Testing user POST route', () => {

    it('should return true', () => {
      expect(true).toEqual(true);
    });
  });
});
