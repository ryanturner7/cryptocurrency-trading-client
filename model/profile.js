'use strict';

const mongoose = require('mongoose');

const {S3} = require('aws-sdk');
const s3 = new S3();

const profileSchema = mongoose.Schema({
  userName:{type: String, required: true},
  userID:{type: mongoose.Schema.Types.ObjectId, required: true},
  trades:{type: mongoose.Schema.Types.ObjectId},
  profilePic:{type: String},
  inbox:{type: String},
  outbox:{type: String},
});

module.exports = mongoose.model('profile', profileSchema);
