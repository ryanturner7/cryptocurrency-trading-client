'use strict';

const {Router} = require('express');

const s3Upload = require('../lib/s3-upload-handler.js');
const bearerAuth = require('../lib/bearer-auth.js');
const Profile = require('../model/profile.js');


const profileRouter = module.exports = new Router();

profileRouter.post('/api/profile/create', bearerAuth, s3Upload('profilePic'), (req, res, next) => {
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

profileRouter.get('/api/profile/profile', bearerAuth, (req, res, next) => {

  return Profile.find()
    .then(profile => {
      console.log('profile', profile);
      res.json(profile);
    })
    .catch(next);
});

profileRouter.put('/api/profile/profile', bearerAuth, s3Upload('profilePic'), (req, res, next) => {
  console.log('s3Data', req.body.userName);
  let updateData = {userName: req.body.userName, profilePic: req.s3Data.Location};

  return Profile.findOneAndUpdate({userID: req.user._id}, updateData)
    .then(profile => {
      res.json(profile);
    })
    .catch(next);
});
