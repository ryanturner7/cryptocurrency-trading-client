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
  const userId = req.user._id;
  Coin.findOne({ userId, type, askingPrice })
    .then(coin => {
      const history = {
        sellerId: userId,
        date: new Date(),
        price: coin.price,
      };
      coin.userId = buyerId;
      coin.history.push(history);
      coin.save().then(() => res.sendStatus(200));
    })
    .catch(() => next(new Error('bad request')));
});

coinRouter.get('/api/coin', bearerAuth, (req, res) => {
  const { type, max } = req.query;
  Coin.find({ type })
    .then(coins => {
      coins = max ?  coins.filter(v => v.askingPrice < max) : coins;
      return res.json(coins);
    });
});

coinRouter.delete('/api/coin', jsonParser, bearerAuth, (req, res) => {
  Coin.findByIdAndRemove(req.body.coinId)
    .then(() => res.sendStatus(200));
});
