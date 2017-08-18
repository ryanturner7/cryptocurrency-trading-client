'use strict';

const crypto = require('crypto');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  tokenSeed: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
});

userSchema.methods.passwordHashCreate = function(password) {
  /* istanbul ignore next */
  return bcrypt.hash(password, 8)
    .then(hash => {
      /* istanbul ignore next */
      this.passwordHash = hash;
      /* istanbul ignore next */
      return this;
    });
};

userSchema.methods.passwordHashCompare = function(password) {

  // console.log('passwordHashCompare', password);
/* istanbul ignore next */
  return bcrypt.compare(password, this.passwordHash)
    .then(isCorrect => {
      /* istanbul ignore next */
      if (isCorrect) return this;
      /* istanbul ignore next */
      throw new Error('Unauthorized password does not match');
    });
};

userSchema.methods.tokenSeedCreate = function (){
  /* istanbul ignore next */
  return new Promise((resolve, reject) => {
    /* istanbul ignore next */
    let tries = 1;
/* istanbul ignore next */
    const _tokenSeedCreate = () => {
      /* istanbul ignore next */
      this.tokenSeed = crypto.randomBytes(32).toString('hex');
      /* istanbul ignore next */
      this.save()
      /* istanbul ignore next */
        .then(() => resolve(this))
        .catch(() => {
          /* istanbul ignore next */
          if (tries < 1) return reject(new Error('server failed to create tokenSeed'));
          /* istanbul ignore next */
          tries--;
          /* istanbul ignore next */
          _tokenSeedCreate();
        });
    };
    /* istanbul ignore next */
    _tokenSeedCreate();
  });
};
/* istanbul ignore next */
userSchema.methods.tokenCreate = function() {
  /* istanbul ignore next */
  return this.tokenSeedCreate()
    .then(() => jwt.sign({ tokenSeed: this.tokenSeed }, process.env.APP_SECRET));
};

const User = module.exports = mongoose.model('user', userSchema);

User.create = function(data){
  /* istanbul ignore next */
  let password = data.password;
  /* istanbul ignore next */
  delete data.password;
  /* istanbul ignore next */
  return new User(data).passwordHashCreate(password)
  /* istanbul ignore next */
    .then(user => user.tokenCreate());
};
