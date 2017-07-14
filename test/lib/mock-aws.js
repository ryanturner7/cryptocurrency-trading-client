'use strict';

const awsMock = require('aws-sdk-mock');

awsMock.mock('S3', 'upload', function(params, cb) {

  // console.log('hit awsmock');

  if (params.ACL !== 'public-read') return cb(new Error('ACL must be public-read'));
  if (params.Bucket !== 'fake-bucket') return cb(new Error('bucket must be fake-bucket'));
  if (!params.Key) return cb(new Error('key must be set'));
  if (!params.Body) return cb(new Error('body must be set'));
  cb(null, {
    Key: params.Key,
    Location: `fakeaws.s3.com/fake-bucket/${params.Key}`,
  });
});

awsMock.mock('S3', 'deleteObject', function(params, cb) {
  if (!params.Key) return cb(new Error('must have key set'));
  if (!params.Bucket) return cb(new Error('bucket must be fake-bucket'));
  cb();
});
