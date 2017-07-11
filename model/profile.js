'use strict';

const mongoose = require('mongoose');

const profileSchema = mongoose.Schema({
  userName:{type: String, required: true},
  userId:{type: mongoose.Schema.Types.ObjectId, ref: 'user'},
  trades:
  profilePic:
  inbox:
  outbox:
})
