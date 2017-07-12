'use strict';

const {Router} = require('express');

const s3Upload = require('../lib/s3-upload-handler.js');
const bearerAuth = require('../lib/bearer-auth.js');
const Profile = require('../model/profile.js');

const profileRouter = module.exports = new Router();

profileRouter.post('/api/profile/create', bearerAuth, s3Upload('profilePic'), (req, res, next) => {
  console.log('s3Data', req.user);
  new Profile({
    userName: req.user.username,
    userID: req.user._id.toString(),
    // trades: '3454',
    profilePic: req.s3Data.Location,
    inbox:'msg one',
    outbox: 'msg two',
  })
    .save()
    .then(profile => res.json(profile))
    .catch(next);
});
