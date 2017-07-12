'use strict';

const mongoose = require('mongoose');

const coinSchema = mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  type: { type: String, required: true },
  askingPrice: Number,
  history: [{ sellerId: mongoose.Schema.Types.ObjectId, date: Data, price: Number }],
});

const Coin = module.exports = mongoose.model('coin', coinSchema);
