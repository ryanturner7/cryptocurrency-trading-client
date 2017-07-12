'use strict';

const { Router } = require('express');
const jsonParser = require('body-parser').json();

const bearerAuth = require('../lib/bearer-auth');
const Coin = require('../model/trade');

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
  const sellerId = req.user._id;
  Coin.findOne({ userId: sellerId, type, askingPrice })
    .then(coin => {
      const history = {
        sellerId,
        date: new Date(),
        price: coin.price,
      };
      coin.userId = buyerId;
      coin.history.push(history);
      coin.save().then(() => res.sendStatus(200));
    })
    .catch(() => next(new Error('bad request')));
});

coinRouter.get('/api/coin', bearerAuth, (req, res, next) => {
  const { type, max } = req.params;
  Coin.find(type)
    .then(coins => {
      coins = max ?  coins.filter(v => v < max) : coins;
      return res.json(coins);
    })
    .catch(() => next(new Error('bad request')));
});
