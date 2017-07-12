'use strict';

const mongoose = require('mongoose');

const profileSchema = mongoose.Schema({
  userName:{type: String, required: true},
  userId:{type: String},
  trades:[{type: mongoose.Schema.Types.ObjectId, ref: '#'}],
  profilePic:{type: String},
  inbox:{type: String},
  outbox:{type: String},
});

const Profile = module.exports = mongoose.model('profile', profileSchema);
// const User = module.exports = mongoose.model('user', userSchema);
