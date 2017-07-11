'use strict';

const { Router } = require('express');
const jsonParser = require('body-parser').json();
const bearerAuth = require('../lib/bearer-auth');

const User = require('../model/user');
const Trade = require('../model/trade');

const tradeRouter = module.exports = new Router();

tradeRouter.post('/api/profile/trade', jsonParser, (req, res, next) => {
  const coin = req.body.serial;
  if(!coin || !buyPrice) return next(new Error('required arguments'));
  Trade.find({ serial: coin }, (err, trade) => {
    if(err) return next(new Error('bad request'));
    const tradeCopy = Object.assign({}, trade);
    const currentDate = new Date();
    const price = req.body.buyPrice;
    trade.soldTo = req.user._id;
    trade.sellPrice = price;
    trade.sellDate = currentDate;
    trade.forSale = false;
    trade.save(() => {
      tradeCopy.purchasedFrom = req.user.username;
      tradeCopy.purchasePrice = price;
      tradeCopy.purchaseDate = currentDate;
      User.findById(req.user._id)
      .then(user => {
        user.trades.push(tradeCopy);
        return res.sendStatus(200);
      })
      .catch(() => return next(new Error('bad request'));
    });
  });
});
