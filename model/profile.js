'use strict';

const mongoose = require('mongoose');

const profileSchema = mongoose.Schema({
  userName:{type: String, required: true},
  userId:{type: mongoose.Schema.Types.ObjectId, ref: 'user'},
  trades:[{type: mongoose.Schema.Types.ObjectId, ref: '#'}],
  profilePic:{type: String},
  inbox:{type: String},
  outbox:{type: String},
});

module.exports = mongoose.model('profile', profileSchema);
