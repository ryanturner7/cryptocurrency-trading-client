'use strict';

const { Router } = require('express');
const jsonParser = require('body-parser').json();

const Coin = require('../model/trade');
const bearerAuth = require('../lib/bearer-auth');

const coinRouter = module.exports = new Router();

coinRouter.post('/api/coin', jsonParser, bearerAuth, (req, res, next) => {
  const { type, askingPrice } = req.body;
  const userId = req.user._id;
  if (!type || ! askingPrice) return next(new Error('required arguments'));
  Coin.create({ type, askingPrice, userId })
    .then(() => res.sendStatus(200))
    .catch(() => next(new Error('bad request')));
});

coinRouter.put('/api/coin', jsonParser, bearerAuth, (req, res, next) => {
  const { type, askingPrice, buyerId } = req.body;
  /* istanbul ignore next */
  const userId = req.user._id;
  /* istanbul ignore next */
  Coin.findOne({ userId, type, askingPrice })
    .then(coin => {
      /* istanbul ignore next */
      const history = {
        sellerId: userId,
        date: new Date(),
        price: coin.price,
      };
      /* istanbul ignore next */
      coin.userId = buyerId;
      /* istanbul ignore next */
      coin.history.push(history);
      /* istanbul ignore next */
      coin.save().then(() => res.sendStatus(200));
    })
    /* istanbul ignore next */
    .catch(() => next(new Error('bad request')));
});

coinRouter.get('/api/coin', bearerAuth, (req, res) => {
  /* istanbul ignore next */
  const { type, max } = req.query;
  /* istanbul ignore next */
    Coin.find({ type })
  /* istanbul ignore next */
    .then(coins => {
      /* istanbul ignore next */
      coins = max ?  coins.filter(v => v.askingPrice < max) : coins;
      /* istanbul ignore next */
      return res.json(coins);
    });
});

coinRouter.delete('/api/coin', jsonParser, bearerAuth, (req, res) => {
  /* istanbul ignore next */
  Coin.findByIdAndRemove(req.body.coinId)
  /* istanbul ignore next */
    .then(() => res.sendStatus(200));
});
