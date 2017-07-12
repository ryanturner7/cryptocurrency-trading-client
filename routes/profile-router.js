'use strict';

const {Router} = require('express');

const s3Upload = require('../lib/s3-upload-handler.js');
const bearerAuth = require('../lib/bearer-auth.js');
const Profile = require('../model/profile.js');

const profileRouter = module.exports = new Router();

profileRouter.post('/api/profile/create', bearerAuth, s3Upload('profilePic'), (req, res, next) => {
  new Profile({
    userID: req.user._id.toString(),
    trades: [23434],
    profilePic: req.s3Data.Location,
    inbox:'msg one',
    outbox: 'msg two',
  })
    .save()
    .then(profile => res.json(profile))
    .catch(next);
});
