const expect = require('expect');
const superagent = require('superagent');
const mockUser = require('./lib/mock-user.js');
const server = require('../lib/server.js');
const cleanDB = require('./lib/clean-db.js');


describe('testing coin', () => {
  let tempUser, tempCoin;
  before(server.start);
  after(server.stop);
  after(cleanDB);

  describe('testing coin POST route', () => {
    it('should return 200 status', () => {
      return mockUser.createOne()
        .then(user => {
          tempUser = user;
          return superagent.post(`${process.env.API_URL}/api/coin`)
            .set('Authorization', `Bearer ${user.token}`)
            .send({
              type: 'bitcoin',
              askingPrice: 100,
            })
            .then(res => {
              expect(res.status).toEqual(200);
            });
        });
    });

    it('should return 400 status', () => {
      return mockUser.createOne()
        .then(user => {
          return superagent.post(`${process.env.API_URL}/api/coin`)
            .set('Authorization', `Bearer ${user.token}`)
            .send({
              type: 'bitcoin',
              askingPrice: 'wrong data type',
            })
            .catch(res => {
              expect(res.status).toEqual(400);
            });
        });
    });

    it('should return 400 status', () => {
      return mockUser.createOne()
        .then(user => {
          return superagent.post(`${process.env.API_URL}/api/coin`)
            .set('Authorization', `Bearer ${user.token}`)
            .catch(res => {
              expect(res.status).toEqual(400);
            });
        });
    });
  });

  describe('testing coin PUT route', () => {
    it('should return 200 status', () => {
      return mockUser.createOne()
        .then(user => {
          return superagent.put(`${process.env.API_URL}/api/coin`)
            .set('Authorization', `Bearer ${tempUser.token}`)
            .send({
              type: 'bitcoin',
              askingPrice: 100,
              buyerId: user.user._id,
            })
            .then(res => expect(res.status).toEqual(200));
        });
    });

    it('should return 400 status', () => {
      return mockUser.createOne()
        .then(() => {
          return superagent.put(`${process.env.API_URL}/api/coin`)
            .set('Authorization', `Bearer ${tempUser.token}`)
            .send({
              type: 'bitcoin',
              askingPrice: 100,
              buyerId: 'unknown user',
            })
            .catch(res => expect(res.status).toEqual(400));
        });
    });
  });

  describe('testing coin GET route', () => {
    it('should return 200 status and a coin', () => {
      return mockUser.createOne()
        .then(user => {
          return superagent.get(`${process.env.API_URL}/api/coin?type=bitcoin&max=200`)
            .set('Authorization', `Bearer ${tempUser.token}`)
            .then(res => {
              tempCoin = res.body[0];
              expect(res.status).toEqual(200);
              expect(tempCoin.history[0].sellerId).toEqual(tempUser.user._id);
              tempUser = user;
            });
        });
    });

    it('should return 400 status', () => {
      return mockUser.createOne()
        .then(() => {
          return superagent.get(`${process.env.API_URL}/api/coin`)
            .set('Authorization', `Bearer ${tempUser.token}`)
            .catch(res => expect(res.status).toEqual(400));
        });
    });
  });

  describe('testing coin DELETE route', () => {
    it('should return 200 status', () => {
      return mockUser.createOne()
        .then(() => {
          return superagent.delete(`${process.env.API_URL}/api/coin`)
            .set('Authorization', `Bearer ${tempUser.token}`)
            .send({ coinId:  tempCoin._Id })
            .then(res => {
              expect(res.status).toEqual(200);
            });
        });
    });

    it('should return 400 status', () => {
      return mockUser.createOne()
        .then(() => {
          return superagent.delete(`${process.env.API_URL}/api/coin`)
            .set('Authorization', `Bearer ${tempUser.token}`)
            .send({ coinId:  null })
            .catch(res => {
              expect(res.status).toEqual(400);
            });
        });
    });
  });
});
