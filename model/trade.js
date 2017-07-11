'use strict';

const mongoose = require('mongoose');

const tradeSchema = mongoose.Schema({
  serial: { type: String, required: true },
  type: { type: String, required: true },
  purchasedFrom: { type: mongoose.Schema.Types.ObjectId, required: true },
  purchasePrice: { type: Number, required: true },
  purchaseDate: { type: Date, default: Date.now },
  soldTo: { type: mongoose.Schema.Types.ObjectId },
  sellPrice: { type: Number },
  sellDate: { type: Date },
  forSale: { type: Boolean, default: false },
  askingPrice: { type: Number },
});

const Trade = module.exports = mongoose.model('trade', tradeSchema);
