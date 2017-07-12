const Coin = require('../model/trade.js');
const expect = require('expect');
const superagent = require('superagent')
const mockUser = require('./lib/mock-user.js');
const server = require('../lib/server.js');
const cleanDB = require('./lib/clean-db.js');


describe('testing coin', () => {
  let tempUser;
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
    });

    describe('testing coin GET route', () => {
      it('should return 200 status', () => {
        return mockUser.createOne()
          .then(() => {
            return superagent.get(`${process.env.API_URL}/api/coin?type=bitcoin&max=200`)
              .set('Authorization', `Bearer ${tempUser.token}`)
              .then(res => expect(res.status).toEqual(200));
          });
      });
    });
  });
});
