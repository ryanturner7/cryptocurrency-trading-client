'use strict';

require('dotenv').config({path: `${__dirname}/../.test.env`});
require('./lib/mock-aws');

const expect = require('expect');
const superagent = require('superagent');

const server = require('../lib/server');
const cleanDB = require('./lib/clean-db');
const mockUser = require('./lib/mock-user');

const API_URL = process.env.API_URL;

describe('tesing User', () => {
  let tempUser;
  before(server.start);
  after(server.stop);
  after(cleanDB);

  describe('tesing POST api/auth/register', () => {
    it('should respond with a token', () => {
      return superagent.post(`${API_URL}/api/auth/register`)
        .send({
          username: 'test_user01',
          password: 'top secret01',
          email: 'test01@test.com',
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

    it('should respond with code 409', () => {
      return superagent.post(`${API_URL}/api/auth/register`)
        .send({
          username: 'test_user01',
          password: 'top secret01',
          email: 'test01@test.com',
        })
        .catch(res => {
          expect(res.status).toEqual(409);
        });
    });
  });

  describe('testing GET /api/auth/login', () => {
    it('should respond with a token', () => {
      return mockUser.createOne()
        .then(userData => {
          tempUser = userData.user;
          let encoded = new Buffer(`${tempUser.username}:${userData.password}`).toString('base64');
          return superagent.get(`${API_URL}/api/auth/login`)
            .set('Authorization', `Basic ${encoded}`);
        })
        .then(res => {
          expect(res.status).toEqual(200);
        });
    });

    it('should respond with code 401', () => {
      return mockUser.createOne()
        .then(userData => {
          tempUser = userData.user;
          let encoded = '09kjk534kljlk345435435';
          return superagent.get(`${API_URL}/api/auth/login`)
            .set('Authorization', `Basic ${encoded}`);
        })
        .catch(res => {
          expect(res.status).toEqual(401);
        });
    });

    it('should respond with code 401', () => {
      return mockUser.createOne()
        .then(userData => {
          tempUser = userData.user;
          let encoded = new Buffer(`:${userData.password}`).toString('base64');
          return superagent.get(`${API_URL}/api/auth/login`)
            .set('Authorization',  `Basic ${encoded}`);
        })
        .catch(res => {
          expect(res.status).toEqual(401);
        });
    });

    it('should respond with code 401', () => {
      return mockUser.createOne()
        .then(userData => {
          tempUser = userData.user;

          // let encoded = new Buffer(`${userData.username}:${userData.password}`).toString('base64');

          return superagent.get(`${API_URL}/api/auth/login`)
            .set('Authorization',  ` `);
        })
        .catch(res => {
          expect(res.status).toEqual(401);
        });
    });
  });

  describe('testing DELETE /api/user', () => {
    it('should delete user and respond with 200', () => {
      let tempUser;
      return mockUser.createOne()
        .then(userData => {
          tempUser = userData;
          return superagent.delete(`${API_URL}/api/auth/delete`)
            .set('Authorization', `Bearer ${tempUser.token}`);
        })
        .then(res => {
          expect(res.status).toEqual(200);
          expect(res._id).toEqual(tempUser._id);
        });
    });
  });
});
