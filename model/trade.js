'use strict';

const mongoose = require('mongoose');

const coinSchema = mongoose.Schema({
  userId: { type: String, required: true },
  type: { type: String, required: true },
  askingPrice: { type: Number, required: true },
  history: [{ sellerId: mongoose.Schema.Types.ObjectId, date: Date, price: Number }],
});

module.exports = mongoose.model('coin', coinSchema);
