'use strict';

require('dotenv').config({ path: `${__dirname}/../.env` });
require('./lib/mock-aws');

const expect = require('expect');
const superagent = require('superagent');

const server = require('../lib/server');
const cleanDB = require('./lib/clean-db');
const mockUser = require('./lib/mock-user');

const API_URL = process.env.API_URL;

describe('testing Profile', () => {
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
        .then(res => {
          expect(res.status).toEqual(200);
        });
    });
  });

  describe('testing GET /api/profile/profiles', () => {
    it('should retrieve an profile', () => {
      let tempUserData;
      return mockUser.createOne()
        .then(userData => {
          tempUserData = userData;
          console.log('tempuser', tempUserData._id);
          return superagent.get(`${API_URL}/api/profile/profile`)
            .set('Authorization', `Bearer ${tempUserData.token}`);
        })
        .then(res => {
          console.log('^^^^^^^^^^^',res.body);
          expect(res.status).toEqual(200);
        });
    });
  });

  describe('testing PUT /api/profile/profile', () => {
    it('should update a profile', () => {
      let tempUserData;
      return mockUser.createOne()
        .then(userData => {
          tempUserData = userData;
          console.log('tempuser', tempUserData._id);
          return superagent.put(`${API_URL}/api/profile/profile`)
            .set('Authorization', `Bearer ${tempUserData.token}`)
            .field('userName', `oscar`)
            .attach('profilePic', `${__dirname}/assets/profilepic2.png`);
        })
        .then(res => {
          expect(res.status).toEqual(200);
        });
    });
  });
});
