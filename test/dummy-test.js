'use strict';

require('dotenv').config({path: `${__dirname}/../.env`});
const mocha = require('mocha');
const expect = require('expect');
const superagent = require('superagent');
const User = ('../model/user.js');
const server = require('../lib/server');

describe('Testing user model', () => {
  before(server.start);
  after(server.stop);
console.log(process.env.APP_URL);

  describe('Testing user POST route', () => {
    it('Should return a 200 status', () => {
      let  username = 'username';
      let password = 'password';
      let email = 'email';
      return superagent.post(`${process.env.APP_URL}/api/auth/register`)
      .send({ username, password, email })
      .then(res => {
        expect(res.status).toEqaul(200);
      });
    });
  });
});
