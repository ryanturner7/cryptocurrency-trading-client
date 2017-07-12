'use strict';

require('dotenv').config({path: `${__dirname}/../.env`});

const expect = require('expect');
const superagent = require('superagent');

const server = require('../lib/server.js');
const cleanDB = require('./lib/clean-db.js');
const mockUser = require('./lib/mock-user.js');

const API_URL = process.env.API_URL;

describe('testing profile Route', () => {
  before(server.start);
  after(server.stop);
  afterEach(cleanDB);

  describe('testing POST /api/profile/create', () => {
    it('should respond with a profile', () => {
      let tempUserData;
      return mockUser.createOne()
        .then(userData => {
          tempUserData = userData;
          return superagent.post(`${API_URL}/api/profile/create`)
            .set('Authorization', `Bearer ${tempUserData.token}`)
            .field('userName', `${tempUserData.username}`)
            .attach('profilePic', `${__dirname}/assets/profilepic.jpg`);
        })
        .catch(res => {
          expect(res.status).toEqual(500);
        });
    });
  });

  describe('testing GET /api/profile/profiles', () => {
    it('should retrieve an profile', () => {

    });
  });
});
