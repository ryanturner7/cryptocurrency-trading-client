'use strict';

const path = require('path');
const fs = require('fs-extra');
const multer = require('multer');
const { S3 } = require('aws-sdk');

const s3 = new S3();
const upload = multer({ dest: `${__dirname}/../temp-assets` });

module.exports = (fieldName) => (req, res, next) => {

  // console.log('fieldnames', fieldName);
/* istanbul ignore next */
  upload.single(fieldName)(req, res, (err) => {

    /* istanbul ignore next */
    if (err) return next(err);

    /* istanbul ignore next */
    if (!req.file) return next(new Error('validation failed no file added'));
/* istanbul ignore next */
    s3.upload({
      ACL: 'public-read',
      Bucket: process.env.AWS_BUCKET,
      Key: `${req.file.filename}${path.extname(req.file.originalname)}`,
      Body: fs.createReadStream(req.file.path),
    })
      .promise()
      .then(s3Data => {
        /* istanbul ignore next */
        req.s3Data = s3Data;
        /* istanbul ignore next */
        return fs.remove(`${__dirname}/../temp-assets/${req.file.filename}`);
      })
      /* istanbul ignore next */
      .then(() => next())
      .catch(next);
  });
};
