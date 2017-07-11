'use strict';

require('dotenv').config({path: `${__dirname}/../.test.env`});

//npm modules
const expect = require('expect');
const superagent = require('superagent');

//app modules
const server = require('../lib/server.js');

const API_URL = process.env.API_URL;

describe('tesing user auth-router', () => {
  before(server.start);
  after(server.stop);

  describe('tesing POST api/auth/register', () => {
    it('should respond with a token', () => {
      return superagent.post(`${API_URL}/api/auth/register`)
        .send({
          username: 'test_user',
          password: 'top secret',
          email: 'test@test.com',
        })
        .then(res => {
          expect(res.status).toEqual(200);
        });
    });
    it('should respond with code 400', () => {
      return superagent.post(`${API_URL}/api/auth/register`)
        .send({})
        .catch(res => {
          expect(res.status).toEqual(400);
        });
    });
  });
});
